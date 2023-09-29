from app.models import db, Pins_To_Boards, environment, SCHEMA


from app.models import db, Board, environment, SCHEMA


def seed_pins_to_boards():
    pb1 = Pins_To_Boards(
        pinId='1',
        boardId="1"
    )
    pb2 = Pins_To_Boards(
        pinId='38',
        boardId="2"
    )
    pb3 = Pins_To_Boards(
        pinId='1',
        boardId="4"
    )
    pb4 = Pins_To_Boards(
        pinId='2',
        boardId="2"
    )
    pb5 = Pins_To_Boards(
        pinId='2',
        boardId="3"
    )
    pb6 = Pins_To_Boards(
        pinId='2',
        boardId="4"
    )
    pb7 = Pins_To_Boards(
        pinId='3',
        boardId="2"
    )
    pb8 = Pins_To_Boards(
        pinId='3',
        boardId="3"
    )
    pb9 = Pins_To_Boards(
        pinId='4',
        boardId="1"
    )
    pb10 = Pins_To_Boards(
        pinId='5',
        boardId="1"
    )
    pb11 = Pins_To_Boards(
        pinId='6',
        boardId="1"
    )
    pb12 = Pins_To_Boards(
        pinId='6',
        boardId="4"
    )
    pb13 = Pins_To_Boards(
        pinId='7',
        boardId="1"
    )
    pb14 = Pins_To_Boards(
        pinId='7',
        boardId="2"
    )
    pb15 = Pins_To_Boards(
        pinId='8',
        boardId="3"
    )
    pb16 = Pins_To_Boards(
        pinId='8',
        boardId="4"
    )
    pb17 = Pins_To_Boards(
        pinId='9',
        boardId="5"
    )
    pb18 = Pins_To_Boards(
        pinId='9',
        boardId="6"
    )
    pb19 = Pins_To_Boards(
        pinId='10',
        boardId="5"
    )
    pb20 = Pins_To_Boards(
        pinId='10',
        boardId="6"
    )
    pb21 = Pins_To_Boards(
        pinId='11',
        boardId="6"
    )
    pb22 = Pins_To_Boards(
        pinId='12',
        boardId="5"
    )
    pb23 = Pins_To_Boards(
        pinId='13',
        boardId="5"
    )
    pb24 = Pins_To_Boards(
        pinId='13',
        boardId="6"
    )
    pb25 = Pins_To_Boards(
        pinId='14',
        boardId="5"
    )
    pb26 = Pins_To_Boards(
        pinId='15',
        boardId="7"
    )
    pb27 = Pins_To_Boards(
        pinId='15',
        boardId="8"
    )
    pb28 = Pins_To_Boards(
        pinId='16',
        boardId="7"
    )
    pb29 = Pins_To_Boards(
        pinId='17',
        boardId="7"
    )
    pb30 = Pins_To_Boards(
        pinId='18',
        boardId="7"
    )
    pb31 = Pins_To_Boards(
        pinId='18',
        boardId="8"
    )
    pb32 = Pins_To_Boards(
        pinId='25',
        boardId="10"
    )
    pb33 = Pins_To_Boards(
        pinId='27',
        boardId="10"
    )
    pb34 = Pins_To_Boards(
        pinId='29',
        boardId="10"
    )
    pb35 = Pins_To_Boards(
        pinId='23',
        boardId="11"
    )
    pb36 = Pins_To_Boards(
        pinId='30',
        boardId="11"
    )
    pb37 = Pins_To_Boards(
        pinId='18',
        boardId="11"
    )
    pb37 = Pins_To_Boards(
        pinId='13',
        boardId="12"
    )
    pb38 = Pins_To_Boards(
        pinId='39',
        boardId="2"
    )
    db.session.add(pb1)
    db.session.add(pb2)
    db.session.add(pb3)
    db.session.add(pb4)
    db.session.add(pb5)
    db.session.add(pb6)
    db.session.add(pb7)
    db.session.add(pb8)
    db.session.add(pb9)
    db.session.add(pb10)
    db.session.add(pb11)
    db.session.add(pb12)
    db.session.add(pb13)
    db.session.add(pb14)
    db.session.add(pb15)
    db.session.add(pb16)
    db.session.add(pb17)
    db.session.add(pb18)
    db.session.add(pb19)
    db.session.add(pb20)
    db.session.add(pb21)
    db.session.add(pb22)
    db.session.add(pb23)
    db.session.add(pb24)
    db.session.add(pb25)
    db.session.add(pb26)
    db.session.add(pb27)
    db.session.add(pb28)
    db.session.add(pb29)
    db.session.add(pb30)
    db.session.add(pb31)
    db.session.add(pb32)
    db.session.add(pb33)
    db.session.add(pb34)
    db.session.add(pb35)
    db.session.add(pb36)
    db.session.add(pb37)
    db.session.add(pb38)

    db.session.commit()

def undo_pins_to_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins_to_boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM pins_to_boards")
    db.session.commit()
