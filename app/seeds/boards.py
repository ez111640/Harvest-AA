from app.models import db, Board, environment, SCHEMA


def seed_boards():
    board1 = Board(
        userId='1', name="User 1's Gardening Board", public=True
    )
    board2 = Board(
        userId='2', name="User 2's Gardening Board", public=True
    )
    board3 = Board(
        userId='3', name="User 3's Gardening Board", public=True
    )
    board4 = Board(
        userId='4', name="User 4's Gardening Board", public=True
    )
    board5 = Board(
        userId='1', name="User 1's Woodworking Board", public=True
    )
    board6 = Board(
        userId='2', name="User 3's Woodworking Board", public=True
    )
    board7 = Board(
        userId='3', name="User 3's Cooking Board", public=True
    )
    board8 = Board(
        userId='4', name="User 4's Cooking Board", public=True
    )

    db.session.add(board1)
    db.session.add(board2)
    db.session.add(board3)
    db.session.add(board4)
    db.session.add(board5)
    db.session.add(board6)
    db.session.add(board7)
    db.session.add(board8)

def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM boards")

    db.session.commit()
