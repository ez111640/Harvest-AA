from app.models import db, User
from ..models.db import SCHEMA, environment


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', firstName="Emma", lastName="Zimmerman", city="Green Bay", state="WI")
    demo2 = User(
        username='Demo2', email='demo2@aa.io', password='password', firstName="Kayla", lastName="Hatle", city="Sioux City", state="SD")
    demo3 = User(
        username='Demo3', email='demo3@aa.io', password='password', firstName="Abigail", lastName="Holtz", city="Rockton", state="IL")
    demo4 = User(
        username='Demo4', email='demo4@aa.io', password='password', firstName="Zoey", lastName="Meyer", city="Rolla", state="MO")


    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
