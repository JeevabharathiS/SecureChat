// receiver-app/src/App.js
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
    <main>
      <nav><div className="logo">🔒 Secure Receiver</div></nav>
      <section>
        <div className="about-containers">
          {messages.map((msg, idx) => (
            <div key={idx} className="details-container">
              <p><strong>Encrypted:</strong> {msg.encrypted}</p>
              <p><strong>Decrypted:</strong> {msg.decrypted}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
