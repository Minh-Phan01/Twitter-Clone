from flask import Blueprint, jsonify
from sqlalchemy.exc import SQLAlchemyError
from flask_login import login_required, current_user
from app.models import Message, User

message_routes = Blueprint('messages', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@message_routes.route('/')
def messages():
    """
    Query for all messages and returns them in a list of post dictionaries
    """

    messages = Message.query.all()
    return jsonify({'messages': [message.to_dict() for message in messages]})


@message_routes.route('/users/<int:userId>/sender')
def userMessages(userId):
    """
    Query for all messages of a user(sender) and returns them in a dictionary
    """
    user = User.query.get(userId)
    userMessages = Message.query.filter(Message.sender_id == userId)
    return {'messages': [message.to_dict() for message in userMessages]}


# @message_routes.route('/users/<int:userId>/recipient')
# def userMessages(userId):
#     """
#     Query for all messages of a user(recipient) and returns them in a dictionary
#     """
#     user = User.query.get(userId)
#     userMessages = Message.query.filter(Message.recipient_id == userId)
#     return {'messages': [message.to_dict() for message in userMessages]}

