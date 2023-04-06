import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { addAMessage } from '../../../store/messages';
import { io } from 'socket.io-client'
import './CreateMessageForm.css';

const CreateMessageForm = ({sendChat}) => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const currentUser = useSelector(state => state.session.user);
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();
        let newMessage = {
            senderId: currentUser.id,
            recipientId: parseInt(userId),
            body,
            senderInfo: currentUser
        }
        
      
        try {
            const response = await dispatch(addAMessage(newMessage));
            if (response.ok === false) {
                setErrors(['Please input a valid message'])
            } else {
                setBody('')
                setErrors([])
                sendChat({...response, senderInfo: currentUser});
            }
        } catch (error) {
            setErrors(['Please input a valid message'])
        }
      
      
        // await dispatch(addAMessage(newMessage))
        // .then(async (data) => {
        //     if (data.ok === false) {
        //         setErrors(['Please input a valid message'])
        //     } else {
        //         setBody('')
        //         setErrors([])
        //     }
        // })
        // .then((data) => {
        //     data['senderInfo'] = currentUser
        //     sendChat(data)
        // })
        
    }

    return (
        <>
            <section>
                <form onSubmit={handleSubmit}>
                    <ul>
                         {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <div>
                        <textarea
                            type='text'
                            placeholder='Send a message'
                            value={body}
                            onChange={e => setBody(e.target.value)}
                        />
                    </div>
                    <button type='submit'>Send It</button>
                </form>  
            </section>
        </>
    )
}

export default CreateMessageForm;