from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError

class PostForm(FlaskForm):
    body = StringField('Post', validators=[DataRequired()])

# class Meta:
#     csrf=False