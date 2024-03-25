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
  const [newChatText, setNewChatText] = useState('');

  async function fetchRooms() {
    try {
      // Find enrolled courses
      const coursesResponse = await fetch(`http://127.0.0.1:8001/groups/user/${sessionStorage.getItem("userid")}`);
      const coursesData = await coursesResponse.json();

      const personalResponse = await fetch(`http://127.0.0.1:8001/chat/personal/rooms/${sessionStorage.getItem("userid")}`);
      const personalData = await personalResponse.json();

      const final = coursesData.concat(personalData)
      setRooms(final);
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

      const url = room.id >= 0x0fffffff ? `http://127.0.0.1:8001/chat/personal/${room.id}` : `http://127.0.0.1:8001/chat/group/${room.id}`;
      const messagesResponse = await fetch(url);
      const messagesData = await messagesResponse.json();
      setMessages(messagesData);
    } catch (error) {
      console.error("Could not join room:", error);
    }
  }

  // ...

  function sendMessage(e) {
    e.preventDefault();
    if (newMessage.length <= 0) {
      return;
    }

    console.log("Sending message");

    const body = {
      "sender": sessionStorage.getItem("userid"),
      "group": String(selectedRoom.id),
      "content": newMessage
    };

    if (selectedRoom.id >= 0x0fffffff) {
      // Personal
      socket.emit("personal_message", JSON.stringify(body));
    }
    else {
      socket.emit("group_message", JSON.stringify(body));
    }
  }

  async function addNewChat(e) {
    e.preventDefault();

    // Send request to create a new room
    const body = {
      "userid": sessionStorage.getItem("userid"),
      "username": newChatText
    };

    try {
      const response = await fetch("http://127.0.0.1:8001/chat/personal/create", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json"
        }
      });

      // Check if the response status indicates success
      if (!response.ok) {
        // Reset error message if registration was successful
        //setErrorMessage(json.message);
        //setSuccessMessage("");
      } else {
        await fetchRooms();
        //setErrorMessage("");
        //setSuccessMessage("Group was created successfully.");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      //setSuccessMessage("");
      //setErrorMessage("An error occurred while processing your request.");
    }


    await fetchRooms();

    setNewChatText('');
  }

  return (
    <>
      <Menu />
      <div className="messages-container">
        <div className="rooms">
          <div className='roomsHeader'>
            <h2>Messaging</h2>
            <form onSubmit={addNewChat} className="add-new">
              <input type="text" placeholder="Search chatroom" onChange={(e) => setNewChatText(e.target.value)} value={newChatText}/>
              <button type='submit'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="gray" className="bi bi-person-plus" viewBox="0 0 16 16">
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
                </svg>
              </button>
            </form>
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
              <form onSubmit={sendMessage} className="message-input">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit">Send</button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Messages;
