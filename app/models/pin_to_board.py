from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Pins_To_Boards (db.Model, UserMixin):
    __tablename__ = 'pins_to_boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    pinId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("pins.id")))
    boardId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("boards.id"))
)

    pins = db.relationship("Pin", back_populates="pins_to_boards", cascade="all, delete")
    boards = db.relationship("Board", back_populates="pins_to_boards", cascade="all, delete" )


    def to_dict(self):
            return {
                'id': self.id,
                'pinId': self.pinId,
                'boardId': self.boardId,
                'pin': {
                     'url': self.pins.url
                }
            }
