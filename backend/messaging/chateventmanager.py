import requests
from flask_socketio import SocketIO


class ChatEventManager(object):
    def __init__(self, socketio: SocketIO):
        self.socket = socketio
        self.prefix = "http://127.0.0.1:8001/"

    def post_group_chat_message(self, data):
        print(f"Message {data}")
        self.socket.emit("group_message", data)

        # TODO: Make body
        response = requests.request("POST", self.prefix + "internal/add_chat")
        print(response)
        # TODO: Return something for client callback
