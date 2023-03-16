from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Post

class PostForm(FlaskForm):
    body = TextAreaField('Post', validators=[DataRequired()])

class Meta:
        csrf=False