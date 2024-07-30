from pydantic import BaseModel

class NewRoom(BaseModel):
    name: str