from flask import Flask, request
import json
from databasemanager import DatabaseManager


class RequestManager(object):
    def __init__(self):
        self.get_counter = 0
        self.post_counter = 0

    def _respond(self, status_code: int = 200, body: dict = None, mimetype: str = "application/json"):
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

        return self._respond(status_code=200)

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

    def get_announcement(self, id):
        """
        Handle a GET request for an announcement.
        :return: The announcement message
        """
        announcement = DatabaseManager.instance().get_announcement(id)

        if announcement is None:
            return self._respond(status_code=404)

        body = {
            "message": announcement.get_message()
        }

        return self._respond(status_code=200, body=body)
    
    def get_announcements(self):
        """
        Handle a GET request for a list of announcements.
        :return: A list of announcements
        """

        # TODO: return announcement info
        # DatabaseManager.instance().get_announcements(data.get('announcements'))
        body = {
            "1": "announcement 1", 
            "2": "announcement 2", 
            "3": "announcement 3", 
        }

        return self._respond(status_code=200, body=body)
    
    def get_course_announcements(self):
        """
        Handle a GET request for announcements for a given course.
        :return: A list of announcements for the given course
        """

        # TODO: return announcement info for enrolled groups from the database
        # DatabaseManager.instance().get_course_announcements(data.get('course'))
        body = {
            "course1": ["announcement1 for course1", "announcement2 for course1", "announcement3 for course1"], 
        }

        return self._respond(status_code=200, body=body)
    
    def post_announcement(self):
        """
        Handle a POST request for announcements.
        :return: A list of announcements
        """

        data = request.get_json()
        announcement = DatabaseManager.instance().post_announcement(data["group"], data["poster"], data["message"])
        if announcement is None:
            return self._respond(status_code=500)

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
    


    def post_create_group(self):
        """
        Handle a POST request for creating a new educational group.
        :return: The details of the created group
        """
        data = request.get_json()
        user_id = data.get("owner")
        owner = DatabaseManager.instance().get_user(user_id)

        if owner is None:
            body = {
                "message": "Owner not found. Please provide a valid owner ID."
            }
            return self._respond(status_code=404, body=body)

        group_name = data.get("name")
        new_group = DatabaseManager.instance().create_group(group_name, owner)

        if new_group is not None:
            group_data = {
                "groupName": new_group.get_name(),
                "groupOwner": {
                    "ownerId": new_group.get_owner().get_id(),
                    "ownerUsername": new_group.get_owner().get_username(),
                },
                "creationDate": new_group.get_creation_date().isoformat(),
                "backgroundImage": 'https://picsum.photos/seed/picsum/200',  # Provide a default background image
            }
            return self._respond(status_code=200, body=group_data)

        body = {
            "message": "Failed to create the group. Please try again."
        }
        return self._respond(status_code=500, body=body)

    def get_group_details(self, group_id):
        """
        Handle a GET request for educational group details.
        :return: Details of the educational group
        """
        group = DatabaseManager.instance().get_group(group_id)

        if group is None:
            return self._respond(status_code=404)

        group_data = {
            "groupName": group.get_name(),
            "groupOwner": {
                "ownerId": group.get_owner().get_id(),
                "ownerUsername": group.get_owner().get_username(),
            },
            "creationDate": group.get_creation_date().isoformat(),
            "backgroundImage": 'https://picsum.photos/seed/picsum/200',  # Provide a default background image
        }

        return self._respond(status_code=200, body=group_data)

    def get_user_groups(self, user_id):
        """
        Handle a GET request for a list of educational groups owned by a user.
        :return: List of educational groups
        """
        user = DatabaseManager.instance().get_user(user_id)

        if user is None:
            return self._respond(status_code=404)

        groups = DatabaseManager.instance().get_groups_by_user(user_id)

        group_list = {}
        for group in groups:
            group_list[str(group.get_id())] = group.get_name()

        return self._respond(status_code=200, body=group_list)

