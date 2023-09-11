from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .db import db, environment, SCHEMA, add_prefix_for_prod



class Topic(db.Model, UserMixin):
    __tablename__ = 'topics'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)

    follows = db.relationship("Follow", back_populates="topics")
    topics_to_boards = db.relationship("Topics_To_Boards", back_populates="topics")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
