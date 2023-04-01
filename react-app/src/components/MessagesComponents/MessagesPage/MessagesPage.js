import { useParams, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMessages } from '../../../store/messages';
import { MessageList } from '../MessageList/MessageList';
import CreateMessageForm from '../CreateMessageForm/CreateMessage';
import { getAllUsers } from '../../../store/users';
import './MessagesPage.css'
import { useEffect, useState } from 'react';

export const MessagesPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const messagesObj = useSelector(state => state.messagesReducer);
    const messages = Object.values(messagesObj)
    const sessionUser = useSelector(state => state.session.user);
    const [isLoaded, setisLoaded] = useState(false);
    


    useEffect(() => {
        dispatch(getAllUsers()).then(() => {
                dispatch(getAllMessages(userId, sessionUser.id))
            })
        .then(() => setisLoaded(true));
        
    }, [dispatch, userId])

    if (isLoaded && !sessionUser) {
        return <Redirect to='/' />
    }

    return (
        <>
            <h1>Message Someone!</h1>
            {isLoaded &&
                <>
                 <MessageList messages={messages}/>
                <CreateMessageForm /> 
                </>
            }
            
        </>
    )
}

export default MessagesPage;