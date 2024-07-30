from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from lib.manager import ConnectionManager
from repository.webcosket import get_room_manager

router = APIRouter()
ws_manager = ConnectionManager()

@router.post("/msg/{client_id}")
async def msg(msg: str, client_id: str) -> None:
    await ws_manager.send_personal_message(msg, client_id)

@router.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    manager = get_room_manager(room_id)
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_personal_message(data, websocket)
            await manager.broadcast(data, websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
