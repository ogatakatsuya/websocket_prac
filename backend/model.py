from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, func, UniqueConstraint, Index
from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    
class ChatRoom(Base):
    __tablename__ = "rooms"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    socket_id = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    
class Message(Base):
    __tablename__ = "messages"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    chat_room_id = Column(Integer, ForeignKey('rooms.id'), nullable=False)
    message = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    
    __table_args__ = (
        UniqueConstraint('user_id', 'chat_room_id', 'message'),
        Index('idx_user_id_chat_room_id', 'user_id', 'chat_room_id')
    )
    
class UserChatRoom(Base):
    __tablename__ = "user_rooms"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    chat_room_id = Column(Integer, ForeignKey('rooms.id'), nullable=False)
    joined_at = Column(DateTime, default=datetime.now)
    
    __table_args__ = (
        UniqueConstraint('user_id', 'chat_room_id'),
        Index('idx_user_id_chat_room_id', 'user_id', 'chat_room_id') 
    )