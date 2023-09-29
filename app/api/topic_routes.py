from flask import Blueprint, request
from ..models.topic import Topic
from ..models.topic_to_board import Topics_To_Boards
from ..models.follow import Follow
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

@topic_routes.route("/current")
def get_user_topics():
    user_topics = Follow.query.filter(Follow.userId == current_user.id)
    return {'UserTopics': [user_topic.to_dict() for user_topic in user_topics]}

@topic_routes.route("/current", methods= ["POST"])
def add_follow():
    req = request.get_json(force=True)
    print("!!@#@!#@!@#Req", req)
    follow = Follow(
        userId = current_user.id,
        topicId = req
    )
    checkDuplicates = Follow.query.filter(Follow.userId == follow.userId, Follow.topicId == follow.topicId).all()

    if checkDuplicates:
        print("@@@@@@@@", checkDuplicates)
        db.session.commit()
        return "Attempted to add duplicate board"
    else:
        db.session.add(follow)
        db.session.commit()
        return follow.to_dict()

@topic_routes.route("/current", methods=["DELETE"])
def delete_follow():
    req = request.get_json(force=True)
    print("JSDKFLJSDREQ", req)
    follow_to_delete = Follow.query.filter(Follow.userId == current_user.id, Follow.topicId ==req).first()
    print("FTD", follow_to_delete)
    db.session.delete(follow_to_delete)
    db.session.commit()
    return {"Success": "Deleted"}
