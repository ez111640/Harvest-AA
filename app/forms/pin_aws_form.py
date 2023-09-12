from flask_wtf import FlaskForm
from wtforms import StringField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired
from app.models import Pin
from app.s3_helpers import ALLOWED_EXTENSIONS
# from app.routes.aws_helpers import ALLOWED_EXTENSIONS

class PinAWSForm(FlaskForm):
    url=FileField("url", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    link=StringField('link', validators=[DataRequired()])
    description=StringField('description')
    title=StringField('title')
