from flask_socketio import SocketIO, emit
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "https://twittest.onrender.com",
        "http://twittest.onrender.com"
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)

@socketio.on("deleteMessage")
def handle_delete_message(message_id):
    emit("deleteMessage", message_id, broadcast=True) 

@socketio.on("editMessage")
def handle_edit_message(message):
    print("MESSSAAAGGGEEE HERE!!!", message);
    emit("editMessage", message, broadcast=True)