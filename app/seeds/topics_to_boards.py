from app.models import db, Topics_To_Boards, environment, SCHEMA


def seed_topics_to_boards():
    topics_to_board1 = Topics_To_Boards(
        topicId="1", boardId="1"
    )
    topics_to_board2 = Topics_To_Boards(
        topicId="1", boardId="2"
    )
    topics_to_board3 = Topics_To_Boards(
        topicId="1", boardId="3"
    )
    topics_to_board4 = Topics_To_Boards(
        topicId="1", boardId="4"
    )
    topics_to_board5 = Topics_To_Boards(
        topicId="2", boardId="5"
    )
    topics_to_board6 = Topics_To_Boards(
        topicId="2", boardId="6"
    )
    topics_to_board7 = Topics_To_Boards(
        topicId="3", boardId="7"
    )
    topics_to_board8 = Topics_To_Boards(
        topicId="3", boardId="8"
    )

    db.session.add(topics_to_board1)
    db.session.add(topics_to_board2)
    db.session.add(topics_to_board3)
    db.session.add(topics_to_board4)
    db.session.add(topics_to_board5)
    db.session.add(topics_to_board6)
    db.session.add(topics_to_board7)
    db.session.add(topics_to_board8)

    db.session.commit()

def undo_topics_to_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.topics_to_boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM topics_to_boards")
    db.session.commit()
