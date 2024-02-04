from flask import Flask, request
import json


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
