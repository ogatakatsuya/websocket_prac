"use client";
import RoomInput from "./_components/roomInput";
import RoomList from "./_components/roomList";

const RoomPage = () => {
    return (
        <>
            <div className="flex flex-col h-screen justify-center items-center gap-5">
                <h1 className="text-5xl">Room</h1>
                <h2 className="text-xl">Create Room</h2>
                <RoomInput />
                <h2 className="text-xl">Room List</h2>
                <RoomList />
            </div>
        </>
    )
}

export default RoomPage;