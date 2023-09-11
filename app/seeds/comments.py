from app.models import db, Comment, environment, SCHEMA


def seed_comments():
    comment1=Comment(
        userId="2",
        pinId="1",
        commentText="Great information! I thought this was super helpful."
    )
    comment2=Comment(
        userId="3",
        pinId="2",
        commentText="Nice guide for gardeners"
    )
    comment3=Comment(
        userId="4",
        pinId="3",
        commentText="Will be trying this in the fall!"
    )
    comment4=Comment(
        userId="1",
        pinId="4",
        commentText="Very interesting!"
    )
    comment5=Comment(
        userId="3",
        pinId="5",
        commentText="I'd love to do this one day!"
    )
    comment6=Comment(
        userId="4",
        pinId="6",
        commentText="I tried this last summer and just about everything overwintered really well!"
    )
    comment7=Comment(
        userId="1",
        pinId="7",
        commentText="Great read!"
    )
    comment8=Comment(
        userId="2",
        pinId="8",
        commentText="This is for zone 9 and I'm in 5a, so not super helpful."
    )
    comment9=Comment(
        userId="2",
        pinId="9",
        commentText="Our project for next weekend!"
    )
    comment10=Comment(
        userId="2",
        pinId="10",
        commentText="I haven't tried any of these projects yet, but will upload photos when I do!"
    )


    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)


    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
