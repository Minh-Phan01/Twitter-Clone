from app.models import db, Share, Category, environment, SCHEMA
from datetime import datetime 

def seed_shares():
    michael_shares_dwightPost1 = Share(
        id=1,
        user_id=1,
        post_id=3,
        created_at=datetime.utcnow()
    )

     michael_shares_dwightPost2 = Share(
        id=2,
        user_id=1,
        post_id=4,
        created_at=datetime.utcnow()
    )

    dwight_shares_michaelPost2 = Share(
        id=3,
        user_id=2,
        post_id=2,
        created_at=datetime.utcnow()
    )

    kevin_shares_michaelPost2 = Share(
        id=4,
        user_id=3,
        post_id=2,
        created_at=datetime.utcnow()
    )

    db.session.add(michael_likes_dwightPost1)
    db.session.add(michael_shares_dwightPost2)
    db.session.add(dwight_shares_michaelPost2)
    db.session.add(kevin_shares_michaelPost2)
    db.session.commit()

def undo_shares():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.shares RESTART IDENTITY CASCADE;")
    else:
         db.session.execute("DELETE FROM shares")