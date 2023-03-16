from flask import Blueprint, jsonify
from sqlalchemy.exc import SQLAlchemyError
from flask_login import login_required, current_user
from app.models import Post

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


@post_routes.route('/<int:userId>/posts/<int:postId>')
def personPosts(userId, postId):
    """
    Query for all posts of a user and returns them in a dictionary
    """
    user = User.query.get(id)
    userPost = Post.query.filter(
        Post.user_id == userId, Post.id == postId).first()
    return userPost.to_dict()

