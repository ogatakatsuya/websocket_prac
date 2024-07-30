from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from lib.manager import ConnectionManager

router = APIRouter()
ws_manager = ConnectionManager()

@router.post("/msg/{client_id}")
async def msg(msg: str, client_id: str) -> None:
    await ws_manager.send_personal_message(msg, client_id)

@router.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await ws_manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await ws_manager.broadcast(f"New Message : {data}")
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket)