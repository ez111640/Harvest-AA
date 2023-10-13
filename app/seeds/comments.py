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
        commentText="This looks really cool! I haven't tried any of these projects yet, but will upload photos when I do!"
    )
    comment11=Comment(
        userId="1",
        pinId="10",
        commentText="I think this is a great idea. I'd definitely recommend giving it a shot and seeing how well it works for you!"
    )
    comment12=Comment(
        userId="3",
        pinId="10",
        commentText="We did a couple of these projects last weekend. They took a lot of work, but it was totally worth it!"
    )
    comment13=Comment(
        userId="4",
        pinId="10",
        commentText="This was a great beginner project! I was able to make it just like the picture with just the tools I had on hand."
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
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)


    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
