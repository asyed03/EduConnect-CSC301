from requestmanagers.requestmanager import RequestManager
from databasemanager import DatabaseManager


class InternalRequestManager(RequestManager):
    def __init__(self):
        RequestManager.__init__(self)

    def post_chat(self):
        """
        Handle a POST request to join an event.
        :return: If the operation was successful
        """
        # DatabaseManager.instance().test_msg()
        return self._respond(status_code=200)
