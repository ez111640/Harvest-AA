from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import Comment

class CommentForm(FlaskForm):
    commentText = StringField("commentText", validators=[DataRequired()])
