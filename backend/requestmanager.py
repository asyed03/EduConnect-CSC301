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
        # TODO: Check database

        data = request.get_json()
        if data["password"] == "test" and data["email"] == "test@test.com":
            return self._respond(status_code=200)

        body = {
            "message": "The username or password were incorrect. Please try again."
        }
        return self._respond(status_code=401, body=body)

    def get_announcement(self, id):
        """
        Handle a GET request for an announcement.
        :return: The announcement message
        """

        # TODO: return announcement info
        # DatabaseManager.instance().get_announcement(id)
        body = {
            "message": "announcement " + id, 
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
    
    def post_announcements(self):
        """
        Handle a POST request for announcements.
        :return: A list of announcements
        """

        data = request.get_json()
        # TODO: post announcement for the given groups
        # for course in data.get('courses'): DatabaseManager.instance().post_announcements(course, course.get('announcements'))
        body = {
            "messsage": "posted announcement for courses " + data.get('courses')
        }

        return self._respond(status_code=200, body=body)
    
    def delete_announcements(self):
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