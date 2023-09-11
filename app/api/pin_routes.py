from flask import Blueprint, request
from ..models.pin import Pin
import json
from ..forms.pin_form import PinForm
from ..forms.comment_form import CommentForm
from flask_login import login_required, current_user # current_user.id
from ..models import db
from ..models.comment import Comment

pin_routes = Blueprint("pins", __name__)

@pin_routes.route("/<int:id>/comments")
def view_pin_comments(id):
    pin_comments = Comment.query.filter(Comment.pinId == id)
    return {'Comments': [comment.to_dict() for comment in pin_comments]}


@pin_routes.route("/<int:id>/comments", methods=["POST"])
def post_comment(id):
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        comment = Comment(
            commentText = form.data["commentText"],
            userId = current_user.id,
            pinId = id
        )

        db.session.add(comment)
        db.session.commit()

    return comment.to_dict()


@pin_routes.route("/<int:id>")
def get_pin_details(id):
    """
    return details for a single pin by pin Id
    """
    pin = Pin.query.get(id)

    response = pin.to_dict()
    return json.dumps(response)

@pin_routes.route("/")
def get_all_pins():
    """
    LANDING PAGE
    """
    all_pins = Pin.query.all()


    return {'Pins': [pin.to_dict() for pin in all_pins]}


@pin_routes.route("", methods=["POST"])
def add_new_pin():
    """
    ADD A NEW PIN
    """
    form = PinForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit ():
        pin = Pin(
            url = form.data["url"],
            link=form.data["link"],
            description=form.data["description"],
            title = form.data["title"],
            creatorId = current_user.id
        )

        db.session.add(pin)
        db.session.commit()

    return pin.to_dict()


@pin_routes.route("/<int:id>", methods=["PUT"])
def update_pin(id):
    """
    Update pin
    """
    req= request.get_json(force = True)
    form = PinForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    pin = Pin.query.get(id)

    pin.title = req['title']
    pin.link = req['link']
    pin.url = req['url']

    db.session.commit()
    return pin.to_dict()

@pin_routes.route("/<int:id>", methods=["DELETE"])
def delete_pin(id):
    """
    delete a pin
    """
    pin_to_delete = Pin.query.get(id)
    db.session.delete(pin_to_delete)
    db.session.commit()
    return "Deleted"
