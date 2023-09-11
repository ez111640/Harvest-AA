from flask.cli import AppGroup
from .users import seed_users, undo_users
from .boards import seed_boards, undo_boards
from .pins import seed_pins, undo_pins
from .comments import seed_comments, undo_comments
from .topics import seed_topics, undo_topics
from .follows import seed_follows, undo_follows
from .pins_to_boards import seed_pins_to_boards, undo_pins_to_boards
from .topics_to_boards import seed_topics_to_boards, undo_topics_to_boards
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding, truncate all tables prefixed with schema name
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        # Add a truncate command here for every table that will be seeded.
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.topics RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins_to_boards RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.topics_to_boards RESTART IDENTITY CASCADE;")
        db.session.commit()
    seed_users()
    seed_boards()
    seed_pins()
    seed_topics()
    seed_comments()
    seed_follows()
    seed_pins_to_boards()
    seed_topics_to_boards()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_topics_to_boards()
    undo_pins_to_boards()
    undo_follows()
    undo_topics()
    undo_comments()
    undo_pins()
    undo_boards()
    undo_users()

    # Add other undo functions here
