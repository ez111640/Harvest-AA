from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .db import db, environment, SCHEMA, add_prefix_for_prod



class Follow(db.Model, UserMixin):
    __tablename__ = 'follows'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    topicId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("topics.id")))

    users = db.relationship("User", back_populates="follows")
    topics = db.relationship("Topic", back_populates="follows")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'topicId': self.topicId,
            'topicName': self.topics.name
        }
