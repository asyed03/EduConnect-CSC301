import React, { useState, useEffect } from 'react';
import '../styles/Messages.scss';
import Menu from '../components/menu';
//import { v4 as uuidv4 } from 'uuid'; // Importing a UUID library for generating unique IDs

// Dummy data for rooms and messages
const backupRooms = [{ id: 1, name: 'Room 1', img:"https://picsum.photos/200", latestMessage: "Hey, do you kknow when the meeting is?", time:"2:34pm" }, { id: 2, name: 'Room 2',img:"https://picsum.photos/200", latestMessage: "Hey, do you kknow when the meeting is?", time:"2:34pm"  }, { id: 3, name: 'Room 3',img:"https://picsum.photos/200", latestMessage: "Hey, do you kknow when the meeting is?", time:"2:34pm"  }];
const backupMessages = [
  { id: 1, content: 'Hi there!', sender: 'John', timestamp: '2024-02-22T10:30:00', roomId: 1 },
  { id: 2, content: 'Hello!', sender: 'Alice', timestamp: '2024-02-22T11:15:00', roomId: 1 },
  { id: 3, content: 'How are you doing?', sender: 'Bob', timestamp: '2024-02-22T12:00:00', roomId: 1 },
  { id: 4, content: 'Meeting at 2 PM today!', sender: 'Group Chat', timestamp: '2024-02-22T12:30:00', roomId: 2 },
  { id: 5, content: 'Sure, I\'ll be there.', sender: 'You', timestamp: '2024-02-22T13:00:00', roomId: 2 },
  { id: 6, content: 'Great! See you all then.', sender: 'Group Chat', timestamp: '2024-02-22T13:15:00', roomId: 2 },
  { id: 7, content: 'Don\'t forget the documents!', sender: 'Group Chat', timestamp: '2024-02-22T13:45:00', roomId: 2 },
  { id: 8, content: 'I\'ll bring them.', sender: 'Alice', timestamp: '2024-02-22T14:00:00', roomId: 2 },
  // Add more messages as needed
];


const Messages = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('/api/rooms');

        if (!response.ok) {
          throw new Error(`Failed to fetch rooms: ${response.status}`);
        }

        const contentType = response.headers.get('Content-Type');

        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setRooms(data);
          setError(null);
        } else {
          // Handle non-JSON response
          throw new Error('Unexpected response format: Not a JSON');
        }
      } catch (error) {
        setRooms(backupRooms);
        setError(`Error fetching rooms: ${error.message}`);
        console.error(error); 
        // Log the detailed error to the console
      }
    };

    fetchRooms();
  }, []);

  const selectRoom = async (room) => {
    setSelectedRoom(room);

    try {
      const response = await fetch(`/api/messages/${room.id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.status}`);
      }

      const contentType = response.headers.get('Content-Type');

      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setMessages(data);
        setError(null);
      } else {
        // Handle non-JSON response
        throw new Error('Unexpected response format: Not a JSON');
      }
    } catch (error) {
      // setMessages(backupMessages);
      const roomMessages = backupMessages.filter(message => message.roomId === room.id);
    setMessages(roomMessages);
      setError(`Error fetching messages: ${error.message}`);
      console.error(error); // Log the detailed error to the console
    }
  };
  function handleSearch(e) {
    if (props.handleSearch != undefined) {
      props.handleSearch(e);
    }
  }
  const [newMessage, setNewMessage] = useState('');



// ...

const sendMessage = () => {
  // Ensure a selected room before sending a message
  if (!selectedRoom) {
    console.error('No room selected for sending a message');
    return;
  }

  // Ensure a non-empty message content before sending
  if (!newMessage.trim()) {
    console.error('Cannot send an empty message');
    return;
  }

  // Simulate sending the message to the server/API and getting a response
  // In a real application, you would replace this with actual API calls
  const simulateSendMessageToServer = async () => {
    try {
      // Simulating a server/API call to send a message
      // You should replace this with actual API calls using fetch or axios
      // Include your authentication logic to get the sender's ID
      const response = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newMessage,
          senderId: 'yourUserId', // Replace with your actual user ID
          timestamp: new Date().toISOString(),
          roomId: selectedRoom.id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error.message);
      throw error; // Propagate the error to handle it elsewhere if needed
    }
  };

  simulateSendMessageToServer()
    .then((newMessageFromServer) => {
      // Update the messages state with the new message from the server
      setMessages([...messages, newMessageFromServer]);
      setNewMessage('');
    })
    .catch((error) => {
      // Handle the error, e.g., show a notification to the user
      console.error('Error sending message:', error.message);
    });
};


  return (
    <>
      <Menu selectedPage="messages" />
      <div className="messages-container">
        <div className="rooms">
          <div  className='roomsHeader'>
          <h2>Group Messages</h2>
          <input className="group-message-search"type="text" placeholder="Search... " onChange={handleSearch} />
          </div>
          {rooms.map(room => (
            <div key={room.id} onClick={() => selectRoom(room)} className={`room ${selectedRoom && selectedRoom.id === room.id ? 'selected' : ''}`}>
              <img className='image' src={room.img}/>
              <div className='details'>
                <div className="top-details">
              <div className='roomName'>{room.name}</div>
              <div className='time'>{room.time}</div>
              </div>
              <div className='roomMessage'>{room.latestMessage}</div>
              
              </div>
            </div>
          ))}
        </div>
        <div className="selected-room">
          {/* {error && <p className="error">{error}</p>} */}
          {selectedRoom && (
            <>
            <div className='selectedRoomHeader'>
              <h2>{selectedRoom.name}</h2>
              </div>
              <ul className="message-list">
  {messages.map(message => (
    <li key={message.id} className={message.sender === 'You' ? 'sent' : 'received'}>
      <span className="sender">{message.sender}</span>
      {message.content}
    </li>
  ))}
</ul> <div className="message-input">
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
