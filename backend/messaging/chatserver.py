from flask import Flask
from flask_socketio import SocketIO
from chateventmanager import ChatEventManager

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", transport=["websocket"])

PORT = 8002


def add_listeners(io: SocketIO, event_manager: ChatEventManager):
    io.on_event("group_message", event_manager.post_group_chat_message)


if __name__ == "__main__":
    chat_event_manager = ChatEventManager(socketio)
    add_listeners(socketio, chat_event_manager)
    socketio.run(app, allow_unsafe_werkzeug=True, debug=True, port=PORT)
