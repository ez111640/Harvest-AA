from app.models import db, Follow, environment, SCHEMA


def seed_follows():
    follow1 = Follow(
        userId='1', topicId="1"
    )
    follow2 = Follow(
        userId='2', topicId="2"
    )
    follow3 = Follow(
        userId='3', topicId="3"
    )
    follow4 = Follow(
        userId='4', topicId="4"
    )
    follow5 = Follow(
        userId='1', topicId="2"
    )
    follow6 = Follow(
        userId='2', topicId="5"
    )
    follow7 = Follow(
        userId='3', topicId="6"
    )
    follow8 = Follow(
        userId='4', topicId="7"
    )

    db.session.add(follow1)
    db.session.add(follow2)
    db.session.add(follow3)
    db.session.add(follow4)
    db.session.add(follow5)
    db.session.add(follow6)
    db.session.add(follow7)
    db.session.add(follow8)

    db.session.commit()
def undo_follows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM follows")
        db.session.commit()
