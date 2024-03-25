from flask import Flask
from flask_cors import CORS

from databasemanager import DatabaseManager
from requestmanagers.userrequestmanager import UserRequestManager
from requestmanagers.grouprequestmanager import GroupRequestManager
from requestmanagers.eventrequestmanager import EventRequestManager
from requestmanagers.internalrequestmanager import InternalRequestManager
from requestmanagers.announcementrequestmanager import AnnouncementRequestManager
from requestmanagers.announcementcommentrequestmanager import AnnouncementCommentRequestManager

PORT = 8001


def create_server():
    app = Flask(__name__)
    CORS(app)
    return app


def add_group_endpoints(server: Flask, request_manager: GroupRequestManager):
    server.add_url_rule("/groupregister", "group-create", methods=["POST"], view_func=request_manager.post_create_group)
    server.add_url_rule("/groups/user/<id>", "user-group-get", methods=["GET"], view_func=request_manager.get_user_groups)
    server.add_url_rule("/groups", "group-get-all", methods=["GET"], view_func=request_manager.get_all_groups)
    server.add_url_rule("/groups/join/<id>", "group-join", methods=["POST"], view_func=request_manager.post_join_group)
    server.add_url_rule("/groups/rate/<id>", "group-rate", methods=["POST"], view_func=request_manager.post_rate_group)
    server.add_url_rule("/groups/ratings/<group_id>/<user_id>", "group-get-rating-user", methods=["GET"], view_func=request_manager.get_user_rating)
    server.add_url_rule("/groups/<id>", "group-get", methods=["GET"], view_func=request_manager.get_group)


def add_event_endpoints(server: Flask, request_manager: EventRequestManager):
    server.add_url_rule("/events/<id>", "events-get", methods=["GET"], view_func=request_manager.get_user_events)
    server.add_url_rule("/events/create", "events-create", methods=["POST"], view_func=request_manager.post_event)
    server.add_url_rule("/events/join/<id>", "events-join", methods=["POST"], view_func=request_manager.post_event_join)


def add_user_endpoints(server: Flask, request_manager: UserRequestManager):
    server.add_url_rule("/login", "login", methods=["POST"], view_func=request_manager.post_login)
    server.add_url_rule("/register", "register", methods=["POST"], view_func=request_manager.post_register)
    server.add_url_rule("/users/<id>", "users-get", methods=["GET"], view_func=request_manager.get_user)
    server.add_url_rule("/users/update", "users-update", methods=["POST"], view_func=request_manager.post_user_update)
    server.add_url_rule("/users/update/password", "users-update-password", methods=["POST"], view_func=request_manager.post_user_change_password)
    server.add_url_rule("/chat/group/<id>", "get-group-chat", methods=["GET"], view_func=request_manager.get_group_chat)


def add_announcement_endpoints(server: Flask, request_manager: AnnouncementRequestManager, comment_request_manager: AnnouncementCommentRequestManager):
    server.add_url_rule("/announcements/<id>", "announcements-get", methods=["GET"], view_func=request_manager.get_course_announcements)
    server.add_url_rule("/announcements/create", "announcements-create", methods=["POST"], view_func=request_manager.post_announcement)

    server.add_url_rule("/announcements/comments/<id>", "announcement-comments-get", methods=["GET"], view_func=comment_request_manager.get_announcement_comments)
    server.add_url_rule("/announcements/comments/create", "announcement-comments-create", methods=["POST"], view_func=comment_request_manager.post_announcement_comment)
    server.add_url_rule("/announcements/comments/delete", "announcement-comments-delete", methods=["DELETE"], view_func=comment_request_manager.delete_announcement_comment)

    server.add_url_rule("/announcements/upvote/<id>", "upvote-announcement", methods=["POST"], view_func=request_manager.post_upvote_announcement)
    server.add_url_rule("/announcements/downvote/<id>", "downvote-announcement", methods=["POST"], view_func=request_manager.post_downvote_announcement)


def add_internal_endpoints(server: Flask, request_manager: InternalRequestManager):
    server.add_url_rule("/internal/chat/group", "add-chat-group", methods=["POST"], view_func=request_manager.post_chat_group)


if __name__ == "__main__":
    server = create_server()

    user_request_manager = UserRequestManager()
    add_user_endpoints(server, user_request_manager)

    group_request_manager = GroupRequestManager()
    add_group_endpoints(server, group_request_manager)

    event_request_manager = EventRequestManager()
    add_event_endpoints(server, event_request_manager)

    announcement_request_manager = AnnouncementRequestManager()
    announcement_comment_request_manager = AnnouncementCommentRequestManager()
    add_announcement_endpoints(server, announcement_request_manager, announcement_comment_request_manager)

    internal_request_manager = InternalRequestManager()
    add_internal_endpoints(server, internal_request_manager)

    DatabaseManager.instance()  # Initial call to .instance() will setup the database
    # server.run(debug=True, port=PORT)
    server.run(port=PORT)
