import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Sender() {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await axios.get('http://localhost:5000/messages');
    setMessageList(res.data);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    await axios.post('http://localhost:5000/messages', { message });
    setMessage('');
    fetchMessages();
  };

  return (
    <div>
      <h2>📤 Sender</h2>
      <div>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>🗂️ Previously Sent Messages:</h3>
        {messageList.length === 0 ? (
          <p>No messages sent yet.</p>
        ) : (
          messageList.map((msg, index) => (
            <div key={index} className="message-card">
              <p><strong>Decrypted Message:</strong> {msg.decrypted}</p>
              <p><strong>Encrypted Message:</strong> {msg.encrypted}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Sender;