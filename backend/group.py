from datetime import datetime


class Group:
    """
    Representation of an educational group.
    """

    def __init__(self, group_id: int, name: str, description: str, owner: int, picture: str, creation_date: datetime = None):
        self.group_id = group_id
        self.name = name
        self.description = description
        self.owner = owner
        self.picture = picture
        self.creation_date = creation_date or datetime.now()

    def get_id(self):
        return self.group_id

    def get_name(self):
        return self.name

    def get_description(self):
        return self.description

    def get_owner(self):
        return self.owner

    def get_creation_date(self):
        return self.creation_date

    def get_picture(self):
        return self.picture
