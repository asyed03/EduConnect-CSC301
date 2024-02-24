import '../styles/Messages.scss';
import Menu from '../components/menu';
import { io } from "socket.io-client";
import React, { useState, useEffect } from 'react';

const Messages = () => {
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);

  const socket = io.connect("http://127.0.0.1:8002", { transports: ["websocket"], debug: true });

  async function fetchRooms() {
    try {
      // Find enrolled courses
      const coursesResponse = await fetch(`http://127.0.0.1:8001/groups/user/${sessionStorage.getItem("userid")}`);
      const coursesData = await coursesResponse.json();

      setRooms(coursesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function handleMessage(msg) {
    const res = JSON.parse(msg);
    var temp = messages;
    temp.unshift(res); // Add to start
    console.log("Received: ", res);
    setMessages(temp);
    console.log(messages);
    setNewMessage(""); // Clear the new message
  }

  useEffect(() => {
    async function fetchRoomData() {
      await fetchRooms();
    }

    fetchRoomData();

    socket.on("messageres", handleMessage);
    return () => {
      socket.off("messageres", handleMessage);
    };
  }, []);

  async function selectRoom(room) {
    setSelectedRoom(room);

    try {
      // Send join room
      // Get all the messages back
    } catch (error) {
      console.error("Could not join room:", error);
    }
  }

  // ...

  function sendMessage() {
    if (newMessage.length <= 0) {
      return;
    }

    console.log("Sending message");

    const body = {
      "sender": sessionStorage.getItem("userid"),
      "group": 1,
      "content": newMessage
    };

    socket.emit("group_message", JSON.stringify(body));
  }

  return (
    <>
      <Menu />
      <div className="messages-container">
        <div className="rooms">
          <div className='roomsHeader'>
            <h2>Messaging</h2>
            <input type="text" placeholder="Search chatroom" />
          </div>
          {rooms.map(room => (
            <div key={room.id} onClick={() => selectRoom(room)} className={`room ${selectedRoom && selectedRoom.id === room.id ? 'selected' : ''}`}>
              <img className='image' src="https://picsum.photos/200" />
              <div className='details'>
                <div className="top-details">
                  <div className='roomName'>{room.title}</div>
                </div>
                <div className='roomMessage'>{room.description}</div>

              </div>
            </div>
          ))}
        </div>
        <div className="selected-room">
          {/* {error && <p className="error">{error}</p>} */}
          {selectedRoom && (
            <>
              <div className='selectedRoomHeader'>
                <h2>{selectedRoom.title}</h2>
              </div>
              <ul className="message-list">
                {messages.map(message => (
                  <li key={message.id} className={message.sender == sessionStorage.getItem("userid") ? 'sent' : 'received'}>
                    <span className="sender">{message.sender_name}</span>
                    {message.content}
                  </li>
                ))}
              </ul> 
              <div className="message-input">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Messages;
