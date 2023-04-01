from flask_socketio import SocketIO


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