class User(object):
    """
    Representation of a user in the database.
    """

    def __init__(self, identifier: int, email: str, username: str, password: str, picture: str):
        self.identifier = identifier
        self.email = email
        self.username = username
        self.password = password
        self.picture = picture

    def get_id(self): return self.identifier
    def get_email(self): return self.email
    def get_username(self): return self.username
    def get_password(self): return self.password
    def get_picture(self): return self.picture
