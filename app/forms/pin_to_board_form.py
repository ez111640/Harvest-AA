from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Pins_To_Boards

class PinToBoardForm(FlaskForm):
    pinId = IntegerField("pinId", validators=[DataRequired()])
