const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Generate key/iv for AES
const key = crypto.randomBytes(32); // 256-bit key
const iv = crypto.randomBytes(16);  // 128-bit IV

let messages = [];

function encrypt(text) {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
}

function decrypt(encrypted) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
}

// API Endpoints
app.get('/messages', (req, res) => {
  const decryptedMessages = messages.map(decrypt);
  res.json(decryptedMessages);
});

app.post('/messages', (req, res) => {
  const { message } = req.body;
  const encryptedMessage = encrypt(message);
  messages.push(encryptedMessage);
  res.status(200).json({ status: 'Message received' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
