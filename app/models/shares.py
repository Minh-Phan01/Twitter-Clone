from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Share(db.Model):
    __tablename__ = 'shares'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    user = db.relationship('User', back_populates='shares')
    post = db.relationship('Post', back_populates='shares')

    def to_dict(self):
        return {
            'id' = self.id,
            'userId' = self.user_id,
            'postId' = self.post_id,
            'createdAt' = self.created_at,
            'updatedAt' = self.updated_at,
            'userInfo' = self.users.to_dict()
        }