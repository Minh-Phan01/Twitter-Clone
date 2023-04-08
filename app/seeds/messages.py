from app.models import db, Message, environment, SCHEMA
from datetime import datetime

def seed_messages():
    dwight_to_michael1 = Message(
        sender_id=2,
        recipient_id=1,
        body='So I am the Assistant Regional Manager',
        created_at=datetime.utcnow()
    )

    michael_to_dwight1 = Message(
        sender_id=1,
        recipient_id=2,
        body='Assistant TO the Regional Manager...',
        created_at=datetime.utcnow()
    )

    dwight_to_michael2 = Message(
        sender_id=2,
        recipient_id=1,
        body='Assistant Regional Manager...',
        created_at=datetime.utcnow()
    )
    
    michael_to_dwight2 = Message(
        sender_id=1,
        recipient_id=2,
        body='ASSISTANT TO THE REGIONAL MANAGER!!',
        created_at=datetime.utcnow()
    )


    michael_to_kevin1 = Message(
        sender_id=1,
        recipient_id=3,
        body='Kevin....cookie...',
        created_at=datetime.utcnow()
    )

    kevin_to_michael1 = Message(
        sender_id=3,
        recipient_id=1,
        body='Coming Michael!',
        created_at=datetime.utcnow()
    )

    db.session.add(dwight_to_michael1)
    db.session.add(michael_to_dwight1)
    db.session.add(dwight_to_michael2)
    db.session.add(michael_to_dwight2)
    db.session.add(michael_to_kevin1)
    db.session.add(kevin_to_michael1)
    db.session.commit()


def undo_messages():
     if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
     else:
         db.session.execute("DELETE FROM messages")

     db.session.commit()    