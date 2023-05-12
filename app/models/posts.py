from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Post(db.Model):
    __tablename__ = 'posts'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    body = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    user = db.relationship('User', back_populates='posts')
    # shares = db.relationship('Share', back_populates='post')
    # likes = db.relationship('Like', back_populates='post')
    comments = db.relationship('Comment', back_populates='post')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'body': self.body,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'userInfo': self.user.to_dict()
        }