from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .db import db, environment, SCHEMA, add_prefix_for_prod



class Pin(db.Model, UserMixin):
    __tablename__ = 'pins'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(), nullable=False)
    link = db.Column(db.String())
    description = db.Column(db.String(), nullable=False)
    title = db.Column(db.String(), nullable=False)
    creatorId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    users = db.relationship("User", back_populates="pins")
    pins_to_boards = db.relationship("Pins_To_Boards", back_populates="pins", cascade="all, delete")
    comments = db.relationship("Comment", back_populates="pins", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'description': self.description,
            'title': self.title,
            'userId': self.creatorId,
            'link': self.link
        }
