from flask import Blueprint, jsonify, request
from sqlalchemy.exc import SQLAlchemyError
from flask_login import login_required, current_user
from app.models import Post, db
from ..forms.posts import PostForm


post_routes = Blueprint('posts', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@post_routes.route('/')
def posts():
    """
    Query for all posts and returns them in a list of post dictionaries
    """
    posts = Post.query.all()
    return jsonify({'posts': [post.to_dict() for post in posts]})


@post_routes.route('/', methods=['POST'])
@login_required
def post_create():
    """
    Create a post for a user
    """

    print('LOOOOOOKK ATTTT MEEEEEEE', request.get_json())
    form = PostForm()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_post = Post(
            user_id=current_user.get_id(),
            body=data['body']
             )
        
        db.session.add(new_post)
        db.session.commit()
        
        return new_post.to_dict()
    # return 'Hellooooooo'



