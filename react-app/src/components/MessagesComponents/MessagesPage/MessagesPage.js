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
    const history = useHistory();
    const dispatch = useDispatch();
    const messagesObj = useSelector(state => state.messagesReducer);
    const users = useSelector(state => state.usersReducer)
    const profileUser = Object.values(users).filter(user => user.id == userId)
    const messages = Object.values(messagesObj);
    const [socketMessages, setSocketMessages] = useState(messages);
    const sessionUser = useSelector(state => state.session.user);
    const [isLoaded, setisLoaded] = useState(false);
    const [socket, setSocket] = useState(null); 
    
   

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
        
        setSocketMessages(prevState => {
            const messageIndex = prevState.findIndex(ele => ele.id === message.id)
           
            if (messageIndex !== -1) {
                const newMessages = [...prevState]
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

    if (isLoaded && (!profileUser.length)) {
        return <Redirect to='/' />
    }

    if (parseInt(userId) === sessionUser.id) {
        return <Redirect to='/' />
    }; 
  
    if (isLoaded && !sessionUser) {
      return <Redirect to='/' />;
    }
  
    // console.log(socketMessages)

    return (
      <>
      <div className='messages-name-container'>
        <h1 className='messages-page-header'>Converse Here!</h1>
        {isLoaded &&
          <>
          <div className='message-list-container'>
            <MessageList className='messages-list' socketMessages={socketMessages} socket={socket}/>
          </div>
            <div className='create-message-container'>
                <CreateMessageForm className='create-message-form' sendChat={sendChat}/>
            </div>
          </>
        }

      </div>
      </>
    );
  };
  

export default MessagesPage;