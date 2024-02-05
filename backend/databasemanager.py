import psycopg2 as pg
from user import User
from announcement import Announcement


class DatabaseManager(object):
    """
    A singleton database manager. Access it using instance().
    """
    _instance = None
    connection = None

    def __init__(self):
        raise RuntimeError("Call instance() instead")

    @classmethod
    def instance(cls):
        if cls._instance is None:
            cls._instance = cls.__new__(cls)
            cls._instance._initialize()

        return cls._instance

    def _initialize(self):
        try:
            self.connection = pg.connect("user=postgres password=admin")
            self._setup_database()
            return True
        except pg.Error as ex:
            print(ex)
            return False

    def _clear_database(self):
        """
        WARNING: This will clear the entire database. Use for testing purposes only.
        """
        with self.connection.cursor() as curs:
            curs.execute("DROP SCHEMA IF EXISTS edu_connect CASCADE;")
            self.connection.commit()

    def _setup_database(self):
        # self._clear_database()
        cursor, schema_file = None, None

        try:
            cursor = self.connection.cursor()

            schema_file = open("schema.ddl", "r")
            cursor.execute(schema_file.read())

            self.connection.commit()
        except Exception as ex:
            self.connection.rollback()
            raise Exception(f"Could not setup the schema: \n{ex}")
        finally:
            if cursor and not cursor.closed:
                cursor.close()
            if schema_file:
                schema_file.close()

    def register_user(self, email: str, username: str, password: str) -> User | None:
        """
        Register a new user into the database.
        :param password: The user's password
        :param username: The user's username
        :param email: The user's email
        :return: The User object if the registration was successful, None otherwise
        """
        cursor = None
        try:
            cursor = self.connection.cursor()
            cursor.execute("INSERT INTO edu_user(username, email, password) VALUES(%s, %s, %s) RETURNING id;",
                           [username, email, password])

            new_id = cursor.fetchone()
            if new_id[0] <= 0:
                return None

            self.connection.commit()
            print("Created user with ID: " + str(new_id[0]))
            return User(new_id[0], email, username, password)
        except pg.Error as ex:
            self.connection.rollback()
            print(ex)
            return None
        finally:
            if cursor and not cursor.closed:
                cursor.close()

    def login_user(self, email: str, password: str) -> User | None:
        """
        Attempt to retrieve a user with the given email and password, and return it if it exists.
        :param email: The user's email
        :param password: The user's password
        :return: The User if they exist, None otherwise
        """
        cursor = None
        try:
            cursor = self.connection.cursor()
            cursor.execute("SELECT * FROM edu_user WHERE email = %s AND password = %s", [email, password])
            if cursor.rowcount <= 0:
                return None

            for record in cursor:
                user = User(int(record[0]), record[2], record[1], record[3])
                return user
        except pg.Error as ex:
            print(ex)
            return None
        finally:
            if cursor and not cursor.closed:
                cursor.close()

    def get_user(self, identifier: int) -> User | None:
        """
        Get a user with the given identifier.
        :param identifier: The identifier of the user
        :return: Object for the user, or None if not found
        """
        cursor = None
        try:
            cursor = self.connection.cursor()
            cursor.execute("SELECT * FROM edu_user WHERE id = %s", [identifier])
            if cursor.rowcount <= 0:
                return None

            for record in cursor:
                user = User(int(record[0]), record[2], record[1], record[3])
                return user
        except pg.Error as ex:
            print(ex)
            return None
        finally:
            if cursor and not cursor.closed:
                cursor.close()

    def get_announcement(self, identifier: int) -> Announcement | None:
        """
        Get an announcement with the given identifier.
        :param identifier: The identifier of the announcement
        :return: Object for the announcement, or None if not found
        """
        cursor = None
        try:
            cursor = self.connection.cursor()
            cursor.execute("SELECT * FROM announcement WHERE id = %s", [identifier])
            if cursor.rowcount <= 0:
                return None

            for record in cursor:
                announcement = Announcement(identifier, record[1], record[2], record[4], record[3])
                return announcement
        except pg.Error as ex:
            print(ex)
            return None
        finally:
            if cursor and not cursor.closed:
                cursor.close()

    def post_announcement(self, group: int, poster: int, message: str):
        """
        Post a new announcement to the given group.
        :param group: The group to post the announcement to
        :param poster: The person posting the announcement
        :param message: The message in the announcement
        :return: The object for the announcement
        """
        cursor = None
        try:
            cursor = self.connection.cursor()
            cursor.execute("INSERT INTO announcement(poster_id, group_id, message) VALUES (%s, %s, %s) "
                           "RETURNING id, date;", [poster, group, message])

            res = cursor.fetchone()
            new_id = res[0]
            new_date = res[1]

            if new_id <= 0:
                return None

            self.connection.commit()

            new_announcement = Announcement(new_id, poster, group, str(new_date), message)
            return new_announcement
        except pg.Error as ex:
            self.connection.rollback()
            print(ex)
            return None
        finally:
            if cursor and not cursor.closed:
                cursor.close()
