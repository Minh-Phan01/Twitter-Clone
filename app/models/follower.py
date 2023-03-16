# from .db import db, environment, SCHEMA, add_prefix_for_prod

# followers = db.Table(
#     'followers',
#     db.Column('user_id', db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), primary_key=True)
#     db.Column('follower_id', db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), primary_key=True)
# )

# if environment == "production":
#     followers.schema = SCHEMA