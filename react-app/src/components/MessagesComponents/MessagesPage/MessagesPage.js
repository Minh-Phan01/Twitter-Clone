import { useParams, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMessages } from '../../../store/messages';
import { MessageList } from '../MessageList/MessageList';
import CreateMessageForm from '../CreateMessageForm/CreateMessage';
import { getAllUsers } from '../../../store/users';
import { io } from 'socket.io-client'
import './MessagesPage.css'
import { useEffect, useState } from 'react';



export const MessagesPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const messagesObj = useSelector(state => state.messagesReducer);
    const messages = Object.values(messagesObj);
    const [socketMessages, setSocketMessages] = useState(messages);
    const sessionUser = useSelector(state => state.session.user);
    const [isLoaded, setisLoaded] = useState(false);
    const [socket, setSocket] = useState(null); 
    console.log(socketMessages)
    useEffect(() => {
      dispatch(getAllUsers())
        .then(() => dispatch(getAllMessages(userId, sessionUser.id)))
        .then((messages) => setSocketMessages(messages))
        .then(() => setisLoaded(true));
  
     
      const socket = io();
      setSocket(socket);
  
      socket.on("chat", (chat) => {
        setSocketMessages(messages => [...messages, chat]);
      });
  
      socket.on('deleteMessage', messageId => {
        setSocketMessages(socketMessages => {
           return socketMessages.filter(message => message.id !== messageId)
        })    
    })

    socket.on("editMessage", (message) => {
        console.log('Socket.on:', message);
        setSocketMessages(prevState => {
            const messageIndex = prevState.findIndex(ele => ele.id === message.id)
            console.log('MessageIndex:', messageIndex);
            if (messageIndex !== -1) {
                const newMessages = [...prevState]
                console.log('newMessages:', newMessages)
                newMessages[messageIndex] = message;
                return newMessages;
            }
            return prevState;
        })
    })


      return () => {
        socket.disconnect();
      };
    }, [dispatch, userId, sessionUser.id]);
  
    
    const sendChat = (message) => {
      socket.emit("chat", message);
    }
  
    if (isLoaded && !sessionUser) {
      return <Redirect to='/' />;
    }
  
    // console.log(socketMessages)

    return (
      <>
        <h1>Converse Here!</h1>
        {isLoaded &&
          <>
            <MessageList socketMessages={socketMessages} socket={socket}/>
            <CreateMessageForm sendChat={sendChat}/>
          </>
        }
      </>
    );
  };
  

export default MessagesPage;