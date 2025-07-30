// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const AES_KEY = crypto.randomBytes(16);
const HMAC_KEY = crypto.randomBytes(32);

let messages = [];

function encryptFernetStyle(plaintext) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-128-cbc', AES_KEY, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const hmac = crypto.createHmac('sha256', HMAC_KEY).update(Buffer.concat([iv, encrypted])).digest();
  const finalBuffer = Buffer.concat([iv, encrypted, hmac]);
  return finalBuffer.toString('base64');
}

function decryptFernetStyle(encodedMessage) {
  const data = Buffer.from(encodedMessage, 'base64');
  const iv = data.slice(0, 16);
  const ciphertext = data.slice(16, data.length - 32);
  const hmac = data.slice(data.length - 32);
  const calcHmac = crypto.createHmac('sha256', HMAC_KEY).update(Buffer.concat([iv, ciphertext])).digest();
  if (!hmac.equals(calcHmac)) throw new Error('Invalid HMAC - Message may be tampered');
  const decipher = crypto.createDecipheriv('aes-128-cbc', AES_KEY, iv);
  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return decrypted.toString('utf8');
}

app.get('/messages', (req, res) => {
  const result = messages.map(({ encrypted }) => {
    const decrypted = decryptFernetStyle(encrypted);
    return { encrypted, decrypted };
  });
  res.json(result);
});

app.post('/messages', (req, res) => {
  const { message } = req.body;
  const encrypted = encryptFernetStyle(message);
  messages.push({ encrypted });
  res.status(200).json({ status: 'ok', encrypted });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
