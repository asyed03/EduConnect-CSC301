class Announcement(object):
    """
    Representation of an announcement in the database.
    """

    def __init__(self, identifier: int, poster_id: int, group_id: int, date: str, message: str, upvotes: int, downvotes: int):
        self.identifier = identifier
        self.poster_id = poster_id
        self.group_id = group_id
        self.date = date
        self.message = message
        self.upvotes = upvotes
        self.downvotes = downvotes

    def get_id(self): return self.identifier
    def get_poster_id(self): return self.poster_id
    def get_group_id(self): return self.group_id
    def get_date(self): return self.date
    def get_message(self): return self.message
    def get_upvotes(self): return self.upvotes
    def get_downvotes(self): return self.downvotes