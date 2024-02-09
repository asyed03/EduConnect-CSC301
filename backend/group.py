from datetime import datetime
from user import User  # Assuming users.py is in the same directory

class Group:
    """
    Representation of an educational group.
    """

    def __init__(self, group_id: int, name: str, owner: User, creation_date: datetime = None):
        self.group_id = group_id
        self.name = name
        self.owner = owner
        self.creation_date = creation_date or datetime.now()

    def get_id(self):
        return self.group_id

    def get_name(self):
        return self.name

    def get_owner(self):
        return self.owner

    def get_creation_date(self):
        return self.creation_date
