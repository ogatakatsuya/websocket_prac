"use client";

import { useState, useEffect, useRef } from "react";

interface MessageListProps {
    ws: WebSocket | null;
}

type Message = {
    text: string;
    type: string;
};

const MessageList = ({ ws }: MessageListProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ws) {
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log(data);
                const newMessage: Message = data;
                setMessages(prevMessages => [...prevMessages, newMessage]);
            };
        }

        return () => {
            if (ws) {
                ws.onmessage = null;
            }
        };
    }, [ws]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const getMessageClass = (type: string) => {
        switch (type) {
            case "personal":
                return "bg-blue-100 border-blue-300 dark:text-white dark:bg-gray-500";
            case "broadcast":
                return "bg-blue-300 border-gray-300 dark:text-white dark:bg-gray-800";
            default:
                return "bg-gray-100 border-gray-300 dark:text-white";
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chat Room</h2>
                </div>
                <div className="h-96 overflow-y-auto p-4">
                    <ul>
                        {messages.map((message, index) => (
                            <div className={`flex gap-2.5 mb-4 ${message.type === "broadcast" ? "justify-start" : "justify-end"}`} key={index}>
                                <div
                                    className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border rounded-xl dark:border-gray-600 ${getMessageClass(message.type)}`}
                                >
                                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{message.type === "broadcast" ? "Someone" : "Me"}</span>
                                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                                    </div>
                                    <p className="text-sm font-normal py-2.5">{message.text}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef}/>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MessageList;
