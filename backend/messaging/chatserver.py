import random
from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", transport=["websocket"])


@socketio.on("message")
def handle_message(msg):
    print(f"Message {msg}")
    socketio.emit("messageres", "received")


if __name__ == "__main__":
    socketio.run(app, allow_unsafe_werkzeug=True, debug=True)
