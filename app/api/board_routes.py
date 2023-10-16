from flask import Blueprint, request
from ..models.board import Board
from ..models.pin_to_board import Pins_To_Boards
from ..models.pin import Pin
from ..models.comment import Comment
from ..models.topic_to_board import Topics_To_Boards
from ..forms.board_form import BoardForm
from ..forms.board_topic_form import TopicToBoardForm
from ..forms.pin_to_board_form import PinToBoardForm
from flask_login import current_user, login_required
import json
from ..models import db

board_routes = Blueprint("boards", __name__)



@board_routes.route("/<int:id>/pins")
def get_board_pins(id):
    """
    get one pin by board
    """
    print("ID", id)
    pin_to_board = Pins_To_Boards.query.filter(Pins_To_Boards.boardId == id).first()
    if pin_to_board:
        first_pin = Pin.query.filter(Pin.id == pin_to_board.pinId).first()
        return first_pin.to_dict()
    else:
        return {"Error": "No pins"}


@board_routes.route("/<int:id>/pins/all")
def get_all_board_pins(id):
    """
    get all pin by board
    """
    boardPins = {}
    print("ID", id)
    pins_to_board = Pins_To_Boards.query.filter(Pins_To_Boards.boardId == id).all()
    pins_dict = [pin.to_dict() for pin in pins_to_board]

    boardPins[id] = [Pin.query.filter(Pin.id == pin.pinId).all() for pin in pins_to_board]
    print("boardpins", boardPins)
    bp_to_dict = {}
    bp_to_dict[id] = [pin[0].id  for pin in boardPins[id]]

    print(bp_to_dict)

    return {"boardPins": bp_to_dict}





@board_routes.route("/<int:id>", methods=["DELETE"])
def delete_board(id):
    """
    delete a board
    """
    all_board = Board.query.all()
    print("ALLBOARDS", all_board)
    board_to_delete = Board.query.get(id)
    print("BTR", board_to_delete)
    db.session.delete(board_to_delete)
    db.session.commit()
    return "Deleted"

@board_routes.route("", methods=["POST"])
def add_board():
    """
    Add a new board
    """
    form = BoardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    print("FORM", form.data["public"])
    if form.validate_on_submit():
        board = Board(
            name=form.data["name"],
            userId = current_user.id,
            public=form.data["public"]
        )

        db.session.add(board)
        db.session.commit()

    return board.to_dict()

@board_routes.route("/<int:id>/topics", methods=["POST"])
def add_board_topic(id):
    req = request.get_json(force=True)
    topicToBoard = Topics_To_Boards(
        topicId = req["id"],
        boardId = id
    )
    checkDuplicates = Topics_To_Boards.query.filter(Topics_To_Boards.boardId == topicToBoard.boardId, Topics_To_Boards.topicId ==topicToBoard.topicId).all()
    topics = Topics_To_Boards.query.filter(Topics_To_Boards.boardId == id).all()
    if checkDuplicates:
        db.session.commit()
        return "Attempted to add duplicate board"
    else:
        db.session.add(topicToBoard)
        db.session.commit()
        return topicToBoard.to_dict()

@board_routes.route("/<int:id>/topics", methods=["DELETE"])
def delete_board_topic(id):
    req = request.get_json(force=True)
    print("REQID",req["id"] )
    topicId = req["id"]
    thisTTB = Topics_To_Boards.query.filter(Topics_To_Boards.boardId == id, Topics_To_Boards.topicId == topicId ).first()
    thisTTBId= thisTTB.id
    # checkDuplicates = Topics_To_Boards.query.filter(Topics_To_Boards.boardId == topicToBoard.boardId.all()
    # topics = Topics_To_Boards.query.filter(Topics_To_Boards.boardId == id).first()
    db.session.delete(thisTTB)
    db.session.commit()
    return {"deleteId": thisTTBId}

@board_routes.route("/<int:id>/topics")
def get_board_topics(id):
    topics = Topics_To_Boards.query.filter(Topics_To_Boards.boardId == id).all()
    return {"Board_Topics": [ttb.to_dict() for ttb in topics]}



@board_routes.route("/<int:id>", methods=["PUT"])
def update_board(id):
    req = request.get_json(force=True)
    board = Board.query.get(id)
    if(req["public"] == 'true'):
        public = True
    else:
        public = False

    board.name = req["name"]
    board.public = public

    db.session.commit()
    return board.to_dict()

@board_routes.route("/<int:id>/pins", methods=["POST"])
def add_pin_to_board(id):
    req = request.get_json(force=True)
    pin = Pins_To_Boards(
        boardId = id,
        pinId = req["id"]
    )
    db.session.add(pin)
    db.session.commit()

    return pin.to_dict()

@board_routes.route("/<int:id>/pins", methods=["DELETE"])
def remove_pin_from_board(id):
    req = request.get_json(force=True)
    board_pin = Pins_To_Boards.query.filter(Pins_To_Boards.pinId == req["id"], Pins_To_Boards.boardId == id).first()
    db.session.delete(board_pin)
    db.session.commit()
    return { "Success":"Item deleted"}

@board_routes.route("/<int:id>/topics")
def get_all_board_topics(id):
    board_topics = Topics_To_Boards.query.filter(Topics_To_Boards.boardId == id).all()
    return{"board_topics": [ttb.to_dict() for ttb in board_topics]}


@board_routes.route("/all")
def get_all_boards():
    boards = Board.query.all()

    response = [board.to_dict() for board in boards]

    return json.dumps(response)

@board_routes.route("")
def get_user_boards():
    """
    Main user page listing all user boards
    """
    user_boards = Board.query.filter(Board.userId == current_user.id).all()
    response = [board.to_dict() for board in user_boards]


    print("get_user_boards response", json.dumps(response))

    return json.dumps(response)
