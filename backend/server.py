from flask import Flask
from flask_cors import CORS
import requestmanager

PORT = 8001


def create_server():
    app = Flask(__name__)
    CORS(app)
    return app


def add_endpoints(server: Flask, request_manager: requestmanager.RequestManager):
    server.add_url_rule("/", "/", methods=["GET"], view_func=request_manager.get_index)
    server.add_url_rule("/login", "login", methods=["POST"], view_func=request_manager.post_login)
    server.add_url_rule("/register", "register", methods=["POST"], view_func=request_manager.post_register)


if __name__ == "__main__":
    server = create_server()
    request_manager = requestmanager.RequestManager()
    add_endpoints(server, request_manager)
    server.run(debug=True, port=PORT)