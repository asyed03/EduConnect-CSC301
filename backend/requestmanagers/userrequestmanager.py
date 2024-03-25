from flask import request
from requestmanagers.requestmanager import RequestManager
from databasemanager import DatabaseManager


class UserRequestManager(RequestManager):
    def __init__(self):
        RequestManager.__init__(self)

    def post_login(self):
        """
        Handle a POST request for a login attempt.
        :return: Whether the login was successful or not
        """
        data = request.get_json()
        user = DatabaseManager.instance().login_user(data["email"], data["password"])

        if user is None:
            body = {
                "message": "The username or password were incorrect. Please try again."
            }
            return self._respond(status_code=401, body=body)

        body = {
            "id": user.get_id()
        }

        return self._respond(status_code=200, body=body)

    def post_register(self):
        """
        Handle a POST request for a register attempt.
        :return: Whether the register was successful or not
        """
        data = request.get_json()

        if data["email"] == "":
            body = {
                "message": "Invalid email. Please try again."
            }
            return self._respond(status_code=401, body=body)

        if data["username"] == "":
            body = {
                "message": "Invalid username. Please try again."
            }
            return self._respond(status_code=401, body=body)

        if data["password"] == "":
            body = {
                "message": "Invalid password. Please try again."
            }
            return self._respond(status_code=401, body=body)

        if data["confirmPassword"] != data["password"]:
            body = {
                "message": "Passwords do not match. Please try again."
            }
            return self._respond(status_code=401, body=body)

        new_user = DatabaseManager.instance().register_user(data["email"], data["username"], data["password"])

        if new_user is not None:
            return self._respond(status_code=200)

        body = {
            "message": "That username or email is already in use. Please use a different one."
        }
        return self._respond(status_code=401, body=body)

    def get_user(self, id):
        """
        Handle a GET request for a user.
        :return: A User object
        """
        user = DatabaseManager.instance().get_user(id)

        if user is None:
            return self._respond(status_code=404)

        res = {
            "id": user.get_id(),
            "username": user.get_username(),
            "email": user.get_email()
        }

        return self._respond(status_code=200, body=res)

    def get_group_chat(self, id):
        """
        Handle a GET request for a group's chat.
        :param id: The ID of the chat
        :return: A list of messages sent in the group chat
        """
        messages = DatabaseManager.instance().get_group_messages(id)
        messages.reverse()
        return self._respond(status_code=200, body=messages)

    def get_personal_chat(self, id):
        """
        Handle a GET request for a personal DM chat.
        :param id: The ID of the room
        :return: A list of messages sent in the chat
        """
        messages = DatabaseManager.instance().get_personal_messages(int(id) - 0x0fffffff)
        messages.reverse()
        return self._respond(status_code=200, body=messages)

    def post_personal_room(self):
        """
        Handle a POST request to create a personal chat room.
        :return: Whether the request was successful or not
        """
        data = request.get_json()

        username = data["username"]
        user = DatabaseManager.instance().get_user_by_name(username)
        if user is None:
            body = {
                "message": "A user with that name was not found."
            }

            return self._respond(status_code=404, body=body)

        if user.get_id() == int(data["userid"]):
            body = {
                "message": "You cannot make a room with yourself."
            }

            return self._respond(status_code=401, body=body)

        success = DatabaseManager.instance().create_personal_chat_room(int(data["userid"]), user.get_id())
        if not success:
            body = {
                "message": "There already exists a chat room with this person."
            }

            return self._respond(status_code=401, body=body)

        return self._respond(status_code=200)

    def get_personal_rooms(self, id):
        """
        Handle a GET request to get all the user's personal chat rooms
        :param id: The ID of the user
        :return: All the personal rooms
        """
        user = DatabaseManager.instance().get_user(id)

        if user is None:
            return self._respond(status_code=404)

        rooms = DatabaseManager.instance().get_personal_rooms_by_user(id)

        res = []
        for room in rooms:
            other_user = DatabaseManager.instance().get_user(room[1] if room[1] != int(id) else room[2])
            if other_user is None:
                continue

            r = {
                "id": room[0] + 0x0fffffff,  # Just add with a big number to make sure it doesn't overlap with group IDs
                "title": other_user.get_username(),
                "description": "Personal room"
            }
            print(r)
            res.append(r)

        return self._respond(status_code=200, body=res)

    def post_user_change_password(self):
        """
        Handle a POST request for user updates.
        :return: If the operation was successful
        """
        data = request.get_json()
        user_id = data["userid"]
        current_password = data["currentPass"]
        new_password = data["newPass"]
        new_confirm = data["newPassConfirm"]

        if new_password != new_confirm:
            body = {
                "message": "New password does not match the confirmation."
            }

            return self._respond(status_code=401, body=body)

        user = DatabaseManager.instance().get_user(user_id)
        if not user:
            body = {
                "message": "Could not find the specified user."
            }

            return self._respond(status_code=404, body=body)

        if current_password != user.get_password():
            body = {
                "message": "Incorrect current password."
            }

            return self._respond(status_code=401, body=body)

        res = DatabaseManager.instance().update_user(user_id, password=new_password)

        if res:
            body = {
                "message": "Updated successfully."
            }
            return self._respond(status_code=200, body=body)
        else:
            body = {
                "message": "Could not update information."
            }
            return self._respond(status_code=401, body=body)

    def post_user_update(self):
        """
        Handle a POST request for user updates.
        :return: If the operation was successful
        """
        data = request.get_json()
        user_id = data["userid"]
        new_email = data["newEmail"]
        new_username = data["newUsername"]

        user = DatabaseManager.instance().get_user(user_id)
        if not user:
            body = {
                "message": "Could not find the specified user."
            }

            return self._respond(status_code=404, body=body)

        res = None
        if len(new_email) > 0:
            res = DatabaseManager.instance().update_user_email(user_id, new_email)

        if len(new_username) > 0:
            res = DatabaseManager.instance().update_user_username(user_id, new_username)

        if res is None:
            body = {
                "message": ""
            }
            return self._respond(status_code=200, body=body)

        if res:
            body = {
                "message": "Updated successfully."
            }
            return self._respond(status_code=200, body=body)
        else:
            body = {
                "message": "Could not update information."
            }
            return self._respond(status_code=401, body=body)

    def post_user_change_username(self):
        """
        Handle a POST request for user updates.
        :return: If the operation was successful
        """
        data = request.get_json()
        user_id = data["userid"]
        current_username = data["currentUsername"]
        new_username = data["newUsername"]
        new_confirm = data["newUsernameConfirm"]

        if new_username != new_confirm:
            body = {
                "message": "New username does not match the confirmation."
            }

            return self._respond(status_code=401, body=body)

        user = DatabaseManager.instance().get_user(user_id)
        if not user:
            body = {
                "message": "Could not find the specified user."
            }

            return self._respond(status_code=404, body=body)

        if current_username != user.get_username():
            body = {
                "message": "Incorrect current username."
            }

            return self._respond(status_code=401, body=body)

        res = DatabaseManager.instance().update_user(user_id, username=new_username)

        if res:
            body = {
                "message": "Updated successfully."
            }
            return self._respond(status_code=200, body=body)
        else:
            body = {
                "message": "Could not update information."
            }
            return self._respond(status_code=401, body=body)
