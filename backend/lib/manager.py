from fastapi import WebSocket
from typing import List, Dict

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str, sender: WebSocket):
        data = {
            "text": message,
            "type": "broadcast"
        }
        for connection in self.active_connections:
            if connection != sender:
                await connection.send_json(data)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        data = {
            "text": message,
            "type": "personal"
        }
        await websocket.send_json(data)

room_managers: Dict[str, ConnectionManager] = {}
