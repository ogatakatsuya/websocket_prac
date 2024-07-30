"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Room = {
    id: number;
    name: string;
    socket_id: string;
    update_at: string;
    created_at: string;
}

const RoomList = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchRooms = async () => {
            const res = await fetch("http://localhost:8000/rooms",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            setRooms(data.rooms);
            console.log(data);
        }
        fetchRooms();
    }, []);

    const enterChatRoom = (socketId: string) => {
        router.push(`/chat/${socketId}`)
    }

    const deleteChatRoom = async (room_id: number) => {
        const res = await fetch(`http://localhost:8000/rooms/${room_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        if (data.success) {
            setRooms(rooms.filter((room) => room.id !== room_id));
        }
    }
    return(
        <>
            {rooms.length > 0 ? (
                <ul className="gap-4">
                    {rooms.map((room) => (
                        <div key={room.id} className="flex items-center justify-center m-3 gap-3">
                            <li>Room Name {room.name}</li>
                            <button 
                                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" 
                                type="button"
                                onClick={() => enterChatRoom(room.socket_id)}
                            >
                                入室
                            </button>
                            <button 
                                className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded" 
                                type="button"
                                onClick={() => deleteChatRoom(room.id)}
                            >
                                削除
                            </button>
                        </div>
                    ))}
                </ul>
            ) : (
                <p>No rooms</p>
            )}
        </>
    )
}

export default RoomList;