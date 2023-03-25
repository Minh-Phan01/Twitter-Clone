from flask import Blueprint, jsonify, request
from sqlalchemy.exc import SQLAlchemyError
from flask_login import login_required, current_user
from app.models import Message, User, db
from ..forms.messages import MessageForm
from sqlalchemy import or_

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


@message_routes.route('/users/<int:user1Id>/<int:user2Id>/')
def userMessages(user1Id, user2Id):
    """
    Query for all messages of a user(sender) and returns them in a dictionary
    """
    # user = User.query.get()
    userMessages = Message.query.filter(or_(Message.sender_id == user1Id, Message.recipient_id == user1Id)).filter(or_(Message.sender_id == user2Id, Message.recipient_id == user2Id)).all()
    return {'messages': [message.to_dict() for message in userMessages]}


@message_routes.route('/users/<int:user1Id>/<int:user2Id>/', methods=['POST'])
@login_required
def message_create(user1Id, user2Id):
    """
    Create a new message to a user
    """
    form = MessageForm()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_message = Message(
            sender_id=user2Id,
            recipient_id=user1Id,
            body=data['body']
        )

    db.session.add(new_message)
    db.session.commit()

    return new_message.to_dict()


@message_routes.route('/messages/<int:messageId>', methods=['PUT'])
@login_required
def edit_message(messageId):
    """
    Edit message by messageId
    """
    form = MessageForm()
    data = form.data
    message = Message.query.filter(Message.id == messageId).first()
    if (message.sender_id == int(current_user.get_id())):
        for key, value in data.items():
            if hasattr(message, key) and value is not None:
                setattr(message, key, value)

    db.session.commit()
    return message.to_dict()



# @message_routes.route('/users/<int:userId>/recipient')
# def userMessages(userId):
#     """
#     Query for all messages of a user(recipient) and returns them in a dictionary
#     """
#     user = User.query.get(userId)
#     userMessages = Message.query.filter(Message.recipient_id == userId)
#     return {'messages': [message.to_dict() for message in userMessages]}

