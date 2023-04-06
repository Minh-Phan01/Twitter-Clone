from flask import Blueprint, jsonify, request
from sqlalchemy.exc import SQLAlchemyError
# from sqlalchemy import desc
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
    posts = Post.query.order_by(Post.created_at.desc()).all()
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
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    

@post_routes.route('/edit/<int:postId>', methods=['PUT'])
@login_required
def edit_post(postId):
    """
    Edit post by postId
    """
    form = PostForm()
    data = form.data
    print('DATA....', data.items)
    post = Post.query.filter(Post.id == postId).first()
    if (post.user_id == int(current_user.get_id())):
        for key, value in data.items():
            if hasattr(post, key) and value is not None:
                setattr(post, key, value)
    db.session.commit()
    return post.to_dict()


@post_routes.route('/<int:postId>/delete', methods=['DELETE'])
@login_required
def delete_post(postId):
    """
    Delete a post by postId
    """

    post = Post.query.filter(Post.id == postId).first()
    if (post.user_id == int(current_user.get_id())):
        db.session.delete(post)
        db.session.commit()
        return 'Successfully deleted post!'


