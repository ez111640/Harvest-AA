from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Board(db.Model, UserMixin):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    name = db.Column(db.String(), nullable=False)

    users = db.relationship("User", back_populates="boards")
    pins_to_boards = db.relationship("Pins_To_Boards", back_populates="boards")
    topics_to_boards = db.relationship("Topics_To_Boards", back_populates="boards")


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'name': self.name
        }
