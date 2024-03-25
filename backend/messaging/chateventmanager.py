import json
import requests
from flask_socketio import SocketIO, join_room, leave_room, rooms


class ChatEventManager(object):
    def __init__(self, socketio: SocketIO):
        self.socket = socketio
        self.prefix = "http://127.0.0.1:8001/"

    def post_personal_chat_message(self, data):
        headers = {"Content-type": "application/json"}
        response = requests.request("POST", self.prefix + "internal/chat/personal", data=data, headers=headers)

        json_data = json.loads(data)

        # Emit back to the chatroom
        response = requests.request("GET", self.prefix + "users/" + json_data["sender"])
        res = response.json()

        user_response = {
            "sender": json_data["sender"],
            "sender_name": res["username"],
            "content": json_data["content"]
        }

        print("Posting message to room: " + json_data["group"] + ". rooms: ")
        print(rooms())
        self.socket.emit("messageres", json.dumps(user_response), to=json_data["group"])

    def post_group_chat_message(self, data):
        # TODO: Some kind of authorization? pretty unsafe we completely trust the client in this case
        # Send internal call to database
        headers = {"Content-type": "application/json"}
        response = requests.request("POST", self.prefix + "internal/chat/group", data=data, headers=headers)
        # print(response.json())

        json_data = json.loads(data)

        # Emit back to the chatroom
        response = requests.request("GET", self.prefix + "users/" + json_data["sender"])
        res = response.json()
        # print(res)

        user_response = {
            "sender": json_data["sender"],
            "sender_name": res["username"],
            "content": json_data["content"]
        }

        print("Posting message to room: " + json_data["group"] + ". rooms: ")
        print(rooms())
        self.socket.emit("messageres", json.dumps(user_response), to=json_data["group"])

    def join_room(self, data):
        json_data = json.loads(data)

        # username = json_data["userid"]
        room = json_data["room"]
        join_room(room)
        print(f"Joining Room {json_data["room"]}. Current rooms:")
        print(rooms())

    def leave_room(self, data):
        json_data = json.loads(data)
        room = json_data["room"]
        leave_room(room)
        print(f"Leaving Room {json_data["room"]}. Current rooms:")
        print(rooms())
