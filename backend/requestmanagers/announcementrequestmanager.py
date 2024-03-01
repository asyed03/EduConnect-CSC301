from flask import request
from requestmanagers.requestmanager import RequestManager
from databasemanager import DatabaseManager


class AnnouncementRequestManager(RequestManager):
    def __init__(self):
        RequestManager.__init__(self)

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
                "id": announcement.get_id(),
                "poster": poster.get_email(),
                "message": announcement.get_message(),
                "date": str(announcement.get_date()),
                "upvotes": announcement.get_upvotes()
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
    
    def post_upvote_announcement(self):
        data = request.get_json()
        announcement = DatabaseManager.instance().get_announcement(data["announcement_id"])

        if announcement:
            announcement.upvotes += 1
            
            body = {
                "updated_upvotes": announcement.get_upvotes()
            }            
            
            return self._respond(status_code=200, body=body)
        else:
            
            body = {
                "error": "Announcement not found"
            }
            
            return self._respond(status_code=200, body=body) 
