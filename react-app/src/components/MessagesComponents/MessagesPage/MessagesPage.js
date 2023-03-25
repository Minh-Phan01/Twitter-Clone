import { useParams, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMessages } from '../../../store/messages';
import { getAllUsers } from '../../../store/users';
import './MessagesPage.css'
import { useEffect, useState } from 'react';

export const MessagesPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const messages = useSelector(state => state.messagesReducer);
    console.log(messages)
    const [isLoaded, setisLoaded] = useState(false);
    const recipient = useSelector(state => state.usersReducer[userId]);
    


    useEffect(() => {
        dispatch(getAllMessages()).then(() => setisLoaded(true));
    }, [dispatch])

    return (
        <>
            <h1>Message Someone!</h1>
            
        </>
    )
}

export default MessagesPage;