from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func

# followers = db.Table(
#     'followers',
#     db.Column('user_id', db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), primary_key=True)
#     db.Column('follower_id', db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), primary_key=True)
# )
# if environment == "production":
#     followers.schema = SCHEMA

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    profile_picture_url = db.Column(db.String())
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    posts = db.relationship('Post', back_populates='user')
    shares = db.relationship('Share', back_populates='user')
    likes = db.relationship('Like', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')
    # followed = db.relationship('User', primaryjoin=(followers.c.user_id == id), secondaryjoin=(followers.c.follower_id == id), db.backref('followers', lazy='dynamic'), lazy='dynamic')
    sent_messages = db.relationship('Message', back_populates='sender', foreign_keys='Message.sender_id')
    received_messages = db.relationship('Message', back_populates='recipient', foreign_keys='Message.recipient_id')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def posts_to_dict(self):
        postsObj = {}
        for post in self.posts:
            postsObj[post.id] = post.body
        return postsObj

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'profilePictureUrl': self.profile_picture_url,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'posts': self.posts_to_dict()
        }
