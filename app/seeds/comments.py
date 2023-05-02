from app.models import db, Comment, environment, SCHEMA
from datetime import datetime

def seed_comments():
    michael_comment1 = Comment(
        user_id=1,
        post_id=3,
        body='Dwight, you are being weird...',
        created_at=datetime.utcnow()
    )

    dwight_comment1 = Comment(
        user_id=2,
        post_id=1,
        body='Michael...you could call me!!',
        created_at=datetime.utcnow()
    )

    kevin_comment1 = Comment(
        user_id=3,
        post_id=2,
        body='I am hungryyyyy',
        created_at=datetime.utcnow()
    )

    db.session.add(michael_comment1)
    db.session.add(dwight_comment1)
    db.session.add(kevin_comment1)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
         db.session.execute("DELETE FROM comments")

    db.session.commit()