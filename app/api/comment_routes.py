from flask import Blueprint, request
from ..models.pin import Pin
import json
from ..forms.pin_form import PinForm
from flask_login import login_required, current_user # current_user.id
from ..models import db
from ..models.comment import Comment

comment_routes = Blueprint("comments", __name__)

@comment_routes.route("/<int:id>", methods=["DELETE"])
def delete_comment(id):
    comment = Comment.query.get(id)
    print("========>COMMENT", comment)
    db.session.delete(comment)
    db.session.commit()
    return "DELETED"



@comment_routes.route("/")
def get_all_comments():
    all_comments = Comment.query.all()
    return {'Comments': [comment.to_dict() for comment in all_comments]}
