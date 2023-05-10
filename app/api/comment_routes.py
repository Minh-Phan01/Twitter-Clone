from flask import Blueprint, jsonify, request
from sqlalchemy.exc import SQLAlchemyError
# from sqlalchemy import desc
from flask_login import login_required, current_user
from app.models import Comment, db
from ..forms.comments import CommentForm


comment_routes = Blueprint('comments', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')

@comment_routes.route('/')
def comments():
    """
    Query for all comments and returns them in a list of comment dictionaries
    """
    comments = Comment.query.order_by(Comment.created_at.desc()).all()
    return jsonify({'comments': [comment.to_dict() for comment in comments]})


@comment_routes.route('/users/<int:userId>/<int:postId>', methods=['POST'])
@login_required
def comment_create(userId, postId):
    """
    Create a comment for a user
    """

    form = CommentForm()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(
            user_id=userId,
            post_id=postId,
            body=data['body']
        )

        db.session.add(new_comment)
        db.session.commit()

        return new_comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


    @comment_routes.route('/edit/<int:commentId>', methods=['PUT'])
    @login_required
    def edit_comment(commentId):
        """
        Edit a comment by commentId
        """
        form = CommentForm()
        data = form.data
        comment = Comment.query.filter(Comment.id == commentId).first()
        if (comment.user_id == int(current_user.get_id())):
            for key, value in data.items():
                if hasattr(comment, key) and value is not None:
                    setattr(comment, key, value)
        db.session.commit()
        return comment.to_dict()

    
    @comment_routes.route('/<int:commentId>/delete', methods=['DELETE'])
    @login_required
    def delete_comment(commentId):
        """
        Delete a comment by commentId
        """
        comment = Comment.query.filter(Comment.id == commentId).first()
        if (comment.user_id == int(current_user.get_id())):
            db.session.delete(comment)
            db.session.commit()
            return 'Successfully deleted comment!'