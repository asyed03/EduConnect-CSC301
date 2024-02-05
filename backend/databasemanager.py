import psycopg2 as pg


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
        self._clear_database()
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

    def get_student(self, identifier: int):
        """
        Get a student with the given identifier.
        :param identifier: The identifier of the student
        :return: The User object for the student, or None if not found
        """
        cursor = None
        try:
            cursor = self.connection.cursor()
            cursor.execute("SELECT * FROM edu_user WHERE id = %s", [identifier])
            if cursor.rowcount <= 0:
                return None
        except pg.Error as ex:
            raise ex
        finally:
            if cursor and not cursor.closed:
                cursor.close()

    def get_instructor(self, identifier: int):
        pass

    def get_group(self, identifier: int):
        pass
