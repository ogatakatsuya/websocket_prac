from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends
from sqlalchemy.future import select
from lib.manager import room_managers, ConnectionManager

import uuid

from db import get_db
from model import ChatRoom

async def get_rooms(db: AsyncSession) -> list[ChatRoom]:
    result = await db.execute(
        select(ChatRoom)
        .order_by(ChatRoom.id)
    )
    rooms = result.scalars().all()
    return rooms

async def create_room(db: AsyncSession, name: str) -> ChatRoom:
    socket_id = str(uuid.uuid4())
    new_room = ChatRoom(name=name, socket_id=socket_id)
    room_managers[socket_id] = ConnectionManager()
    db.add(new_room)
    await db.commit()
    await db.refresh(new_room)
    return new_room

async def delete_room(db: AsyncSession, room_id: int) -> bool:
    result = await db.execute(select(ChatRoom).where(ChatRoom.id == room_id))
    room = result.scalar_one_or_none()
    if room is None:
        return False
    await db.delete(room)
    await db.commit()
    return True