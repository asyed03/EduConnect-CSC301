from flask import request
from requestmanagers.requestmanager import RequestManager
from databasemanager import DatabaseManager


class AnnouncementCommentRequestManager(RequestManager):
    def __init__(self):
        RequestManager.__init__(self)

    def get_announcement_comments(self, id):
        """
        Handle a GET request for comments on a given announcement.
        :return: A list of comments for the given announcement
        """
        comments = DatabaseManager.instance().get_comments(id)
        res = []

        for comment in comments:
            commenter = DatabaseManager.instance().get_user(comment.get_commenter_id())
            if not commenter:
                continue

            c = {
                "commenter": commenter.get_username(),
                "content": comment.get_comment_text(),
                "date": str(comment.get_comment_date())
            }
            res.append(c)

        return self._respond(status_code=200, body=res)

    def post_announcement_comment(self):
        """
        Handle a POST request for comments on an announcement.
        :return: A list of comments
        """
        data = request.get_json()

        if len(data["content"]) <= 0:
            body = {
                "message": "You must enter comment contents."
            }

            return self._respond(status_code=401, body=body)

        comment = DatabaseManager.instance().post_comment(data["announcement_id"], data["commenter_id"], data["content"])
        if comment is None:
            body = {
                "message": "There was an error while creating the comment."
            }

            return self._respond(status_code=500, body=body)

        return self._respond(status_code=200)

    def delete_announcement_comment(self):
        """
        Handle a DELETE request for comments on an announcement.
        :return: A response indicating success or failure
        """
        data = request.get_json()

        if "comment_id" not in data:
            body = {
                "message": "You must provide a comment_id for deletion."
            }

            return self._respond(status_code=401, body=body)

        comment_id = data["comment_id"]

        # TODO: Add logic to delete the comment with the provided comment_id from the database
        # DatabaseManager.instance().delete_comment(comment_id)

        body = {
            "message": f"Deleted comment with id {comment_id}"
        }

        return self._respond(status_code=200, body=body)
