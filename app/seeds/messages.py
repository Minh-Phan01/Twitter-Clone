from app.models import db, Messages, Category, environment, SCHEMA

def seed_messages():
    dwight_to_michael1 = Message(
        id=1,
        sender_id=2,
        recipient_id=1,
        body='So I am the Assistant Regional Manager'
    )

    michael_to_dwight1 = Message(
        id=2,
        sender_id=1,
        recipient_id=2,
        body='Assistant TO the Regional Manager...'
    )

    dwight_to_michael2 = Message(
        id=3,
        sender_id=2,
        recipient_id=1,
        body='Assistant Regional Manager...'
    )
    
    michael_to_dwight2 = Message(
        id=4,
        sender_id=1,
        recipient_id=2,
        body='ASSISTANT TO THE REGIONAL MANAGER!!'
    )

    db.session.add(dwight_to_michael1)
    db.session.add(michael_to_dwight1)
    db.session.add(dwight_to_michael2)
    db.session.add(michael_to_dwight2)
    db.session.commit()


def undo_messages():
        if environment == "production":
            db.session.execute(
                f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
        else:
        db.session.execute("DELETE FROM messages")