from app.models import db, Post, Category, environment, SCHEMA

def seed_posts():
    michael_post1 = Post(
        id=1,
        user_id=1
        body='I learned a while back that if I do not text 911, people do not return my calls. Um, but people always return my calls because they think that something horrible has happened.',
    )

    michael_post2 = Post(
        id=2,
        user_id=1,
        body='I… Declare... Bankruptcy!'
    )

    dwight_post1 = Post(
        id=3,
        user_id=2,
        body='People underestimate the power of nostalgia. Nostalgia is truly one of the greatest human weaknesses, second only to the neck.'
    )

    dwight_post2 = Post(
        id=4,
        user_id=2,
        body='Five minutes ahead of schedule. Right on schedule.'
    )

    kevin_post1 = Post(
        id=5,
        user_id=3,
        body='Why waste time, say lot word when few word do trick?'
    )

    kevin_post2 = Post(
        id=6,
        user_id=3,
        body='A fluke is one of the most common fish in the sea, so if you go fishing for a fluke, chances are you just might catch one.'
    )

    db.session.add(michael_post1)
    db.session.add(michael_post2)
    db.session.add(dwight_post1)
    db.session.add(dwight_post2)
    db.session.add(kevin_post1)
    db.session.add(kevin_post2)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
         db.session.execute("DELETE FROM posts")


