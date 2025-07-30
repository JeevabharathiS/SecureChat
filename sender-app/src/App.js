import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
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
    <div className="container">
      <h1 className="page-title">Sender</h1>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Enter Your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="send-btn" onClick={sendMessage}>
          Send
        </button>
      </div>

      <div className="message-list">
        {messageList.map((msg, idx) => (
          <div key={idx} className="message-card">
            <p><strong>Your Message:</strong> {msg.decrypted}</p>
            <p><strong>Encrypted:</strong> {msg.encrypted}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
