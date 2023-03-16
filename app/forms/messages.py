from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Message

class Message(FlaskForm):
    body = TextAreaField('Message', validators=[DataRequired()])

class Meta:
    csrf=False