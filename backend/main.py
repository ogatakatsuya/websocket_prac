from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from router.room import router as room_router
from router.websocket import router as websocket_router

app = FastAPI()
app.include_router(room_router)
app.include_router(websocket_router)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/hello")
def hello():
    return "hello world from fastapi!"