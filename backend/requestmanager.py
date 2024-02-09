from flask import Flask, request
import json
from databasemanager import DatabaseManager


class RequestManager(object):
    def __init__(self):
        self.get_counter = 0
        self.post_counter = 0

    def _respond(self, status_code: int = 200, body: dict | list = None, mimetype: str = "application/json"):
        return Flask.response_class(
            status=status_code,
            response=json.dumps(body),
            mimetype=mimetype
        )

    def get_index(self):
        """
        Handle a GET request on the index page.
        :return: A valid response for the index page
        """
        self.get_counter += 1
        body = {
            "counter": self.get_counter
        }

        return self._respond(status_code=200, body=body)

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

        new_user = DatabaseManager.instance().register_user(data["email"], data["email"], data["password"])

        if new_user is not None:
            return self._respond(status_code=200)

        body = {
            "message": "That username or email is already in use. Please use a different one."
        }
        return self._respond(status_code=401, body=body)
    
    def get_course_announcements(self, id):
        """
        Handle a GET request for announcements for a given course.
        :return: A list of announcements for the given course
        """
        announcements = DatabaseManager.instance().get_announcements(id)
        res = []

        for announcement in announcements:
            poster = DatabaseManager.instance().get_user(announcement.get_poster_id())
            if not poster:
                continue

            a = {
                "poster": poster.get_email(),
                "message": announcement.get_message(),
                "date": str(announcement.get_date())
            }
            res.append(a)

        return self._respond(status_code=200, body=res)
    
    def post_announcement(self):
        """
        Handle a POST request for announcements.
        :return: A list of announcements
        """
        data = request.get_json()

        if len(data["content"]) <= 0:
            body = {
                "message": "You must enter announcement contents."
            }

            return self._respond(status_code=401, body=body)

        announcement = DatabaseManager.instance().post_announcement(data["groupid"], data["userid"], data["content"])
        if announcement is None:
            body = {
                "message": "There was an error while creating the announcement."
            }

            return self._respond(status_code=500, body=body)

        return self._respond(status_code=200)
    
    def delete_announcement(self):
        """
        Handle a POST request for announcements.
        :return: A list of announcements
        """

        data = request.get_json()
        # TODO: post announcement for the given groups
        # DatabaseManager.instance().delete_announcements(data.get('announcements'))
        body = {
            "messsage": "deleted announcements with ids " + data.get('announcements')
        }

        return self._respond(status_code=200, body=body)

    def get_group(self, id):
        """
        Get a group.
        :param id: The id of the group
        :return: If the operation was successful or not
        """
        group = DatabaseManager.instance().get_group(id)
        if group is None:
            return self._respond(status_code=404)

        owner = DatabaseManager.instance().get_user(group.get_owner())
        if owner is None:
            return self._respond(status_code=404)

        enrolled = DatabaseManager.instance().get_group_enrolled(id)
        res = {
            "id": group.get_id(),
            "title": group.get_name(),
            "description": group.get_description(),
            "instructor": owner.get_email(),
            "enrolled": enrolled,
            "banner": "https://picsum.photos/1920/1080"
        }

        return self._respond(status_code=200, body=res)

    def post_create_group(self):
        """
        Handle a POST request for creating a new educational group.
        :return: The details of the created group
        """
        data = request.get_json()
        user_id = data.get("userid")
        owner = DatabaseManager.instance().get_user(user_id)

        if owner is None:
            body = {
                "message": "Owner not found. Please provide a valid owner ID."
            }
            return self._respond(status_code=404, body=body)

        group_name = data.get("groupName")
        group_desc = data.get("groupDesc")

        if len(group_name) <= 0 or len(group_desc) <= 0:
            body = {
                "message": "Please provide a valid title and description."
            }
            return self._respond(status_code=401, body=body)

        new_group = DatabaseManager.instance().create_group(group_name, group_desc, user_id)

        if new_group is not None:
            return self._respond(status_code=200)

        body = {
            "message": "Failed to create the group. Please try again."
        }
        return self._respond(status_code=500, body=body)

    def get_user_groups(self, id):
        """
        Handle a GET request for a list of educational groups owned by a user.
        :return: List of educational groups
        """
        user = DatabaseManager.instance().get_user(id)

        if user is None:
            return self._respond(status_code=404)

        groups = DatabaseManager.instance().get_groups_by_user(id)

        res = []
        for group in groups:
            enrolled = DatabaseManager.instance().get_group_enrolled(group.get_id())
            g = {
                "id": group.get_id(),
                "title": group.get_name(),
                "description": group.get_description(),
                "owner": group.get_owner(),
                "enrolled": enrolled
            }

            res.append(g)

        return self._respond(status_code=200, body=res)

    def get_all_groups(self):
        """
        Get all groups in the database.
        :return: All groups in the database
        """
        groups = DatabaseManager.instance().get_all_groups()
        res = []
        for group in groups:
            enrolled = DatabaseManager.instance().get_group_enrolled(group.get_id())
            g = {
                "id": group.get_id(),
                "title": group.get_name(),
                "description": group.get_description(),
                "owner": group.get_owner(),
                "enrolled": enrolled
            }

            res.append(g)

        return self._respond(status_code=200, body=res)

    def post_join_group(self, id):
        """
        Join a group.
        :param id: The id of the group
        :return: Whether the join was successful or not
        """
        data = request.get_json()
        joined = DatabaseManager.instance().join_group(data["userid"], id)

        if not joined:
            return self._respond(status_code=202)

        return self._respond(status_code=200)

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

            e = {
                "id": event.get_id(),
                "title": event.get_title(),
                "description": event.get_description(),
                "owner": event.get_poster_id(),
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
