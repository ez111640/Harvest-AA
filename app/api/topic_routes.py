from flask import Blueprint, request
from ..models.topic import Topic
from flask_login import current_user, login_required
from ..models import db

topic_routes = Blueprint("topics", __name__)

@topic_routes.route("/")
def get_all_topics():
    topics = Topic.query.all()
    return {'Topics': [topic.to_dict() for topic in topics]}



