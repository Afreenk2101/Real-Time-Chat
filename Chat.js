
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:3001');
const Chat = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  useEffect(() => {
    socket.on('chat_history', (messages) => setChat(messages));
    socket.on('receive_message', (data) => setChat((prev) => [...prev, data]));
    return () => {
      socket.off('chat_history');
      socket.off('receive_message');
    };
  }, []);
  const sendMessage = () => {
    const newMessage = { message, time: new Date().toLocaleTimeString() };
    socket.emit('send_message', newMessage);
    setMessage('');
  };
  return (
    <div>
      <h2 style={{color:'Blue'}}><center>Real-time Chat</center></h2>
      <center><div style={{ height: '200px',width:'500px',backgroundColor:'white', overflowY: 'scroll', border: '1px solid #ccc' }}>
        {chat.map((msg, idx) => (
          <div key={idx}>
           <span>{msg.message}</span>
            <span style={{ float: 'right', fontSize: '0.8em' }}>{msg.time}</span><br></br>
          </div>
        ))}
      </div></center><br></br>
      <div>
      <center><input value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Type your chat....'/></center><br></br>
      <center><button onClick={sendMessage}>Send</button></center>
      </div>
    </div>
    
  );
};
export default Chat;
