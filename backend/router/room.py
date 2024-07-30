from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from db import get_db
import repository.room as room_crud
import scheme.room as room_scheme

router = APIRouter()

@router.get("/rooms")
async def get_rooms(db: AsyncSession = Depends(get_db)):
    rooms = await room_crud.get_rooms(db)
    return {"rooms": rooms}

@router.post("/rooms")
async def create_room(new_room: room_scheme.NewRoom, db: AsyncSession = Depends(get_db)):
    new_room_name = new_room.name
    created_room = await room_crud.create_room(db, new_room_name)
    return {"created_room": created_room}