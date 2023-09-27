from flask import Blueprint, request
from ..models.topic import Topic
from ..models.topic_to_board import Topics_To_Boards
from flask_login import current_user, login_required
from ..models import db

topic_routes = Blueprint("topics", __name__)

@topic_routes.route("/")
def get_all_topics():
    topics = Topic.query.all()
    return {'Topics': [topic.to_dict() for topic in topics]}

@topic_routes.route("/<int:id>/boards")
def sort_boards_by_topic(id):
    topics = Topics_To_Boards.query.filter(Topics_To_Boards.topicId == id).all()

    return {'BoardIds': [topic.boardId for topic in topics]}
