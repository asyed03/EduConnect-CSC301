from flask import request
from requestmanagers.requestmanager import RequestManager
from databasemanager import DatabaseManager


class EventRequestManager(RequestManager):
    def __init__(self):
        RequestManager.__init__(self)

    def get_user_events(self, id):
        """
        Get all the events in the courses the given user is in.
        :param id: The user's id
        :return: If the operation was successful
        """
        events = DatabaseManager.instance().get_events(id)
        res = []
        for event in events:
            attending = DatabaseManager.instance().get_event_attending(event.get_id())
            group = DatabaseManager.instance().get_group(event.get_group_id())
            if not group:
                continue

            owner = DatabaseManager.instance().get_user(event.get_poster_id())
            if not owner:
                continue

            e = {
                "id": event.get_id(),
                "title": event.get_title(),
                "description": event.get_description(),
                "owner": owner.get_email(),
                "group": group.get_name(),
                "date": str(event.get_date()),
                "attending": attending
            }

            res.append(e)

        return self._respond(status_code=200, body=res)

    def post_event_join(self, id):
        """
        Handle a POST request to join an event.
        :param id: The event ID
        :return: If the operation was successful
        """
        data = request.get_json()
        joined = DatabaseManager.instance().join_event(data["userid"], id)

        if not joined:
            return self._respond(status_code=202)

        return self._respond(status_code=200)

    def post_event(self):
        """
        Handle a POST request for events.
        :return: If the operation was successful
        """
        data = request.get_json()

        date = data["date"]
        title = data["title"]
        desc = data["desc"]
        group = DatabaseManager.instance().get_group(data["groupid"])
        poster = DatabaseManager.instance().get_user(data["userid"])

        if len(date) <= 0:
            body = {
                "message": "You must provide a valid date."
            }

            return self._respond(status_code=401, body=body)

        if len(title) <= 0:
            body = {
                "message": "You must provide a valid title."
            }

            return self._respond(status_code=401, body=body)

        if len(desc) <= 0:
            body = {
                "message": "You must provide a valid description."
            }

            return self._respond(status_code=401, body=body)

        if not group or not poster:
            body = {
                "message": "Course or user not found."
            }

            return self._respond(status_code=404, body=body)

        event = DatabaseManager.instance().post_event(group, poster, date, title, desc)
        if event is None:
            body = {
                "message": "There was an error while creating the announcement."
            }

            return self._respond(status_code=500, body=body)

        return self._respond(status_code=200)
