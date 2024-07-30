from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends
from sqlalchemy.future import select

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
    db.add(new_room)
    await db.commit()
    await db.refresh(new_room)
    return new_room