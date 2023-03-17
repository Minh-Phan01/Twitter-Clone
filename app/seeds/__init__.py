from flask.cli import AppGroup
from .users import seed_users, undo_users
from .likes import seed_likes, undo_likes
from .messages import seed_messages, undo_messages
from .posts import seed_posts, undo_posts
from .shares import seed_shares, undo_shares


from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_shares()
        undo_likes()
        undo_messages()
        undo_posts()
        undo_users()
        
    seed_users()
    # Add other seed functions here
    seed_likes()
    seed_messages()
    seed_posts()
    seed_shares()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_likes()
    undo_messages()
    undo_posts()
    undo_shares()