from flask import request
from databasemanager import DatabaseManager
from requestmanagers.requestmanager import RequestManager


class InternalRequestManager(RequestManager):
    def __init__(self):
        RequestManager.__init__(self)

    def post_chat_group(self):
        """
        Handle a POST request to send a group message.
        :return: If the operation was successful
        """
        # TODO: Some error checking
        data = request.get_json()
        new_id = DatabaseManager.instance().insert_chat_group(data["sender"], data["group"], data["content"])
        if new_id >= 0:
            body = {"id": new_id}
            return self._respond(status_code=200, body=body)

        return self._respond(status_code=500)

    def post_chat_personal(self):
        """
        Handle a POST request to send a personal message.
        :return: If the operation was successful
        """
        data = request.get_json()
        room = DatabaseManager.instance().get_personal_chat_room(int(data["group"]) - 0x0fffffff)
        if not room:
            return self._respond(status_code=404)

        receiver = room[1] if int(data["sender"]) != room[1] else room[2]
        if DatabaseManager.instance().insert_chat_personal(data["group"], data["content"], data["sender"], receiver):
            return self._respond(status_code=200)

        return self._respond(status_code=500)
