from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Topics_To_Boards

class TopicToBoardForm(FlaskForm):
    topicId = IntegerField("topicId", validators=[DataRequired()])
