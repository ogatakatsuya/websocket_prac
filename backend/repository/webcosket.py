from lib.manager import ConnectionManager, room_managers

def get_room_manager(room_id: str) -> ConnectionManager:
    if room_id not in room_managers:
        room_managers[room_id] = ConnectionManager()
    return room_managers[room_id]