import helper_create_db as helper
from sqlalchemy_utils import database_exists, drop_database


def drop_db():
    """drops database created in this project"""

    if not database_exists(helper.engine.url):
        print("Database does not exists")

    else:
        drop_database(helper.engine.url)
        print("Database Dropped")


if __name__ == "__main__":
    drop_db()
