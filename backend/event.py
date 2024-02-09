class Event(object):
    """
    Representation of an event in the database.
    """

    def __init__(self, identifier: int, poster_id: int, group_id: int, date: str, title: str, desc: str):
        self.identifier = identifier
        self.poster_id = poster_id
        self.group_id = group_id
        self.date = date
        self.title = title
        self.description = desc

    def get_id(self): return self.identifier
    def get_poster_id(self): return self.poster_id
    def get_group_id(self): return self.group_id
    def get_date(self): return self.date
    def get_title(self): return self.title
    def get_description(self): return self.description