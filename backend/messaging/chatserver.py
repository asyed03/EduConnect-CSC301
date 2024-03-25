from flask import Flask
from flask_socketio import SocketIO
from chateventmanager import ChatEventManager

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", transport=["websocket"])

PORT = 8002


def add_listeners(io: SocketIO, event_manager: ChatEventManager):
    io.on_event("group_message", event_manager.post_group_chat_message)
    io.on_event("personal_message", event_manager.post_personal_chat_message)
    io.on_event("join", event_manager.join_room)
    io.on_event("leave", event_manager.leave_room)
    # io.on_event("connect", event_manager.on_connect)


if __name__ == "__main__":
    chat_event_manager = ChatEventManager(socketio)
    add_listeners(socketio, chat_event_manager)
    socketio.run(app, allow_unsafe_werkzeug=True, port=PORT)
