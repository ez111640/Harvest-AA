from app.models import db, Topic, environment, SCHEMA


def seed_topics():
    topic1 = Topic(
        name="Gardening"
    )
    topic2 = Topic(
        name="Woodworking"
    )
    topic3 = Topic(
        name="Cooking & Baking"
    )
    topic4 = Topic(
        name="Self-Care"
    )
    topic5 = Topic(
        name="Livestock"
    )
    topic6 = Topic(
        name="Household Products"
    )
    topic7 = Topic(
        name="Canning & Preserving"
    )
    topic8 = Topic(
        name="Energy"
    )

    db.session.add(topic1)
    db.session.add(topic2)
    db.session.add(topic3)
    db.session.add(topic4)
    db.session.add(topic5)
    db.session.add(topic6)
    db.session.add(topic7)
    db.session.add(topic8)

    db.session.commit()

def undo_topics():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.topics RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM topics")
    db.session.commit()
