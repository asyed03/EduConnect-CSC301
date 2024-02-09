from flask import Flask
from flask_cors import CORS
from requestmanager import RequestManager
from databasemanager import DatabaseManager

PORT = 8001


def create_server():
    app = Flask(__name__)
    CORS(app)
    return app


def add_endpoints(server: Flask, request_manager: RequestManager):
    server.add_url_rule("/", "/", methods=["GET"], view_func=request_manager.get_index)
    server.add_url_rule("/login", "login", methods=["POST"], view_func=request_manager.post_login)
    server.add_url_rule("/register", "register", methods=["POST"], view_func=request_manager.post_register)
    server.add_url_rule("/announcements/<id>", "announcements-get", methods=["GET"], view_func=request_manager.get_announcement)
    # server.add_url_rule("/announcements/list", "announcements-list", methods=["GET"], view_func=request_manager.get_announcements)
    # server.add_url_rule("/announcements/course/<number:id>", "announcements-course-get", methods=["GET"], view_func=request_manager.get_course_announcements)
    server.add_url_rule("/announcements/create", "announcements-create", methods=["POST"], view_func=request_manager.post_announcement)
   
    # server.add_url_rule("/announcements/delete", "announcements-delete", methods=["DELETE"], view_func=request_manager.delete_announcement)

    server.add_url_rule("/groupregister", "group-create", methods=["POST"], view_func=request_manager.post_create_group)
    server.add_url_rule("/group/<id>", "group-get", methods=["GET"], view_func=request_manager.get_group_details(id))
    server.add_url_rule("/group/user/<id>", "user-group-get", methods=["GET"], view_func=request_manager.get_user_groups)


if __name__ == "__main__":
    server = create_server()
    request_manager = RequestManager()
    add_endpoints(server, request_manager)
    DatabaseManager.instance()  # Initial call to .instance() will setup the database
    # server.run(debug=True, port=PORT)
    server.run(port=PORT)
