from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Comment(db.Model, UserMixin):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    pinId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("pins.id")))
    commentText = db.Column(db.String(255), nullable=False)

    pins = db.relationship("Pin", back_populates="comments")
    users = db.relationship("User", back_populates="comments")


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'pinId': self.pinId,
            'commentText': self.commentText
        }
