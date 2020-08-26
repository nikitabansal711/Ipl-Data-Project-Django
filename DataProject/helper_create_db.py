import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)


def create_db():
    """connects the postgresql server and creates database if not exists"""

    if not database_exists(engine.url):
        create_database(engine.url)
        print("Database Created")

    else:
        print("Database Already Exists")


if __name__ == "__main__":
    create_db()
