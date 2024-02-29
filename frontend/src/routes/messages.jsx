import '../styles/Messages.scss';
import Menu from '../components/menu';
import { socket } from "../socket.js";
import React, { useState, useEffect } from 'react';

const Messages = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);

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

  useEffect(() => {
    // no-op if the socket is already connected
    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    function onConnect() {
      console.log("Socket connected");
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("Socket disconnected");
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("messageres", onMessage);

    async function fetchRoomData() {
      await fetchRooms();
    }

    fetchRoomData();

    function onMessage(value) {
      const res = JSON.parse(value);
      console.log("Received: ", res);
      setMessages(previous => [res, ...previous]);
      setNewMessage(""); // Clear the new message
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("messageres", onMessage);
    };
  }, []);

  async function selectRoom(room) {
    // Send leave room
    if (selectedRoom) {
      const bodyLeave = {
        "userid": sessionStorage.getItem("userid"),
        "room": String(selectedRoom.id)
      };
      socket.emit("leave", JSON.stringify(bodyLeave));
    }

    setSelectedRoom(room);

    try {
      // Send join room
      // Get all the messages back
      const bodyJoin = {
        "userid": sessionStorage.getItem("userid"),
        "room": String(room.id)
      };
      socket.emit("join", JSON.stringify(bodyJoin));

      const messagesResponse = await fetch(`http://127.0.0.1:8001/chat/group/${room.id}`);
      const messagesData = await messagesResponse.json();
      setMessages(messagesData);
      console.log(messages);
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
      "group": String(selectedRoom.id),
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
