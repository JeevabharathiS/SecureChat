import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Receiver() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const res = await axios.get('http://localhost:5000/messages');
    setMessages(res.data);
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>📥 Receiver</h2>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        messages.map((msg, idx) => (
          <div key={idx} className="message-card">
            <p><strong>Encrypted Message:</strong> {msg.encrypted}</p>
            <p><strong>Decrypted Message:</strong> {msg.decrypted}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Receiver;