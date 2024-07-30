"use client";

import { useState, useEffect} from "react";

const RoomInput = () => {
    const [roomName, setRoomName] = useState("");
    const clickHandler = async () => {
            const res = await fetch("http://localhost:8000/rooms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: roomName })
        });
        const data = await res.json();
        console.log(data);
        setRoomName("");
    }
    return (
        <>
            <form className="w-full max-w-sm">
                <div className="flex items-center border-b border-teal-500 py-2">
                    <input 
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                        type="text" 
                        placeholder="Input Room Name" 
                        aria-label="roomName" 
                        onChange={(e) => setRoomName(e.target.value)}
                        value={roomName}
                    />
                    <button 
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" 
                        type="button"
                        onClick={clickHandler}
                    >
                        Submit
                    </button>
                    <button 
                        className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" 
                        type="button"
                        onClick={() => setRoomName("")}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </>
    )
}

export default RoomInput;