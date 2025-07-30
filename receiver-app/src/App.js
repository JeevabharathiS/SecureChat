import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    const res = await axios.get('http://localhost:5000/messages');
    setMessages(res.data);
  };

  return (
    <div className="container">
      <h1 className="page-title">Receiver</h1>

      <div className="message-list">
        {messages.map((msg, idx) => (
          <div key={idx} className="message-card">
            <p><strong>Encrypted:</strong> {msg.encrypted}</p>
            <p><strong>Decrypted:</strong> {msg.decrypted}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
