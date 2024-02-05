from flask import Flask
from flask_cors import CORS
import requestmanager
import json

PORT = 8002


def create_server():
    app = Flask(__name__)
    CORS(app)
    return app


def add_endpoints(server: Flask, request_manager: requestmanager.RequestManager):
    server.add_url_rule("/info", "/info", methods=["GET"], view_func=request_manager.get_index)
    server.add_url_rule("/create", "create", methods=["POST"], view_func=request_manager.post_login)


if __name__ == "__main__":
    server = create_server()
    request_manager = requestmanager.RequestManager()
    add_endpoints(server, request_manager)
    server.run(debug=True, port=PORT)


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

        # TODO: return group info from the database

        body = {
            "message": "GET REQUEST received for display group info."
        }

        return self._respond(status_code=200, body=body)

    def post_login(self):
        """
        Handle a POST request for a login attempt.
        :return: Whether the login was successful or not
        """
        # TODO: add to database and return the group info

        body = {
            "message": "POST REQUEST recieved for group creation."
        }
        return self._respond(status_code=200, body=body)