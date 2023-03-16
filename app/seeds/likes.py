from app.models import db, Like, Category, environment, SCHEMA

def seed_likes():
    dwight_likes_michaelPost1 = Like(
        id=1,
        user_id=2,
        post_id=1,
    )

    dwight_likes_michaelPost2 = Like(
        id=2,
        user_id=2,
        post_id=2
    )

    michael_likes_kevinPost1 = Like(
        id=3,
        user_id=1,
        post_id=5
    )

    michael_likes_dwightPost1 = Like(
        id=4,
        user_id=1,
        post_id=3
    )

    kevin_likes_dwightPost1 = Like(
        id=5,
        user_id=3,
        post_id=3
    )

    db.session.add(dwight_likes_michaelPost1)
    db.session.add(dwight_likes_michaelPost2)
    db.session.add(michael_likes_kevinPost1)
    db.session.add(michael_likes_dwightPost1)
    db.session.add(kevin_likes_dwightPost1)
    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
         db.session.execute("DELETE FROM likes")

