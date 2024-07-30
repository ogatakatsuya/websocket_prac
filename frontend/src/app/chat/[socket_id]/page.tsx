"use client";

import { useEffect, useState } from "react";
import MessageInput from "../_components/messageInput";
import MessageList from "../_components/messageList";

interface ChatRoomProps {
    params: {
        socket_id: string;
    }
}

const ChatRoom = ({ params }: ChatRoomProps) => {
    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        const websocket = new WebSocket(`ws://localhost:8000/ws/${params.socket_id}`);
        setWs(websocket);

        websocket.onopen = () => {
            console.log("WebSocket connection established");
        };

        websocket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        return () => {
            websocket.close();
        };
    }, [params.socket_id]);

    return (
        <div className="flex flex-col h-screen justify-center items-center gap-5">
            <MessageList ws={ws} />
            <MessageInput ws={ws} />
        </div>
    );
};

export default ChatRoom;
