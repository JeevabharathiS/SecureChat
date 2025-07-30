// sender-app/src/App.js
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
    <main>
      <nav><div className="logo">🔐 Secure Sender</div></nav>
      <section>
        <input
          type="text"
          placeholder="Enter your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn-color-1" onClick={sendMessage}>Send</button>

        <div className="about-containers">
          {messageList.map((msg, idx) => (
            <div key={idx} className="details-container">
              <p><strong>Your Message:</strong> {msg.decrypted}</p>
              <p><strong>Encrypted:</strong> {msg.encrypted}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
