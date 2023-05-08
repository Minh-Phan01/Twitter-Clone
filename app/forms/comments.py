from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError

class CommentForm(FlaskForm):
    body = StringField('Comment', validators=[DataRequired()])