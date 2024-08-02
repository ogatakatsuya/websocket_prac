"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

type Room = {
    id: number;
    name: string;
    socket_id: string;
    update_at: string;
    created_at: string;
}

const RoomList = () => {
    const router = useRouter();

    const fetchRooms = async () => {
        const res = await fetch("http://localhost:8000/rooms",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if(!res.ok){
            throw new Error("Network response was not ok")
        }
        const result = await res.json()
        return result.rooms
    }

    const { isPending, isError, data, error } = useQuery<boolean, boolean, Room[], string>({
        queryKey: ["rooms"],
        queryFn: fetchRooms,
    })

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
    }

    if (isPending) {
        return <span>Loading...</span>
    }
    
    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return(
        <>
            {data.length > 0 ? (
                <ul className="gap-4">
                    {data.map((room) => (
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