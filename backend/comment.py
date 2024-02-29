class AnnouncementComment(object):
    """
    Representation of a comment on an announcement in the database.
    """

    def __init__(self, identifier: int, announcement_id: int, commenter_id: int, comment_text: str, comment_date: str):
        self.identifier = identifier
        self.announcement_id = announcement_id
        self.commenter_id = commenter_id
        self.comment_text = comment_text
        self.comment_date = comment_date

    def get_id(self):
        return self.identifier

    def get_announcement_id(self):
        return self.announcement_id

    def get_commenter_id(self):
        return self.commenter_id

    def get_comment_text(self):
        return self.comment_text

    def get_comment_date(self):
        return self.comment_date