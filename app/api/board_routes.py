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
    get all pins by board
    """
    print("ID", id)
    pin_to_board = Pins_To_Boards.query.filter(Pins_To_Boards.boardId == id).all()
    if pin_to_board:
        first_pin = Pin.query.filter(Pin.id == pin_to_board.pinId)
        return first_pin.to_dict()
    else:
        return "No pins"


@board_routes.route("/<int:id>", methods=["DELETE"])
def delete_board(id):
    """
    delete a board
    """
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

    if form.validate_on_submit():
        board = Board(
            name=form.data["name"],
            userId = current_user.id
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
    db.session.add(topicToBoard)
    db.session.commit()
    return topicToBoard.to_dict()



@board_routes.route("/<int:id>/topics")
def get_board_topics(id):
    topics = Topics_To_Boards.query.filter(Topics_To_Boards.boardId == id).all()
    return {"Board_Topics": [ttb.to_dict() for ttb in topics]}



@board_routes.route("/<int:id>", methods=["PUT"])
def update_board(id):
    req = request.get_json(force=True)
    board = Board.query.get(id)

    board.name = req["name"]

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

@board_routes.route("/<int:id>/topics")
def get_all_board_topics(id):
    board_topics = Topics_To_Boards.query.filter(Topics_To_Boards.boardId == id).all()
    print("BOARDTOPICS", board_topics)
    return{"board_topics": [ttb.to_dict() for ttb in board_topics]}

@board_routes.route("")
def get_user_boards():
    """
    Main user page listing all user boards
    """
    user_boards = Board.query.filter(Board.userId == current_user.id).all()
    response = [board.to_dict() for board in user_boards]


    print("get_user_boards response", json.dumps(response))

    return json.dumps(response)
