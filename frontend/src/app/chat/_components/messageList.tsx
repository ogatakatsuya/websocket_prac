// MessageList Component
"use client";

import { useState, useEffect } from "react";

interface MessageListProps {
    ws: WebSocket | null;
}

const MessageList = ({ ws }:MessageListProps) => {
    const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //     if (ws) {
    //         ws.onmessage = (event) => {
    //             const newMessage = JSON.parse(event.data);
    //             setMessages((prevMessages) => [...prevMessages, newMessage]);
    //         };
    //     }

    //     return () => {
    //         if (ws) {
    //             ws.onmessage = null;
    //         }
    //     };
    // }, [ws]);

    return (
        <div className="w-full max-w-md">
            <h2>Messages</h2>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default MessageList;
