// Chatroom.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Menu from '../components/menu';
import '../styles/CourseView.scss';
import { io } from "socket.io-client"

const Chatroom = () => {
    const [msg, setMsg] = useState("");
    const [results, setResults] = useState([]);

    const socket = io.connect("http://127.0.0.1:8002", { transports: ["websocket"], debug: true });

    useEffect(() => {
        const handleMessage = (msg) => {
            console.log("Received: ", msg);
        };

        socket.on("messageres", handleMessage);

        return () => {
            socket.off("messageres", handleMessage);
        };
    }, []);

    function sendMessage() {
        console.log("Sending message");

        const body = {
            "sender": 1,
            "group": 1,
            "content": msg
          };

        socket.emit("group_message", JSON.stringify(body));
    }

    return (
        <>
            <Menu />
            <div className="dashboard">
                <div>
                    {results.map(res => (
                        <p>{res}</p>
                    ))}
                </div>
                <br />
                <br />
                <input type="text" name="msg" id="msg" onChange={(e) => setMsg(e.target.value)} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </>
    );
};

export default Chatroom;
