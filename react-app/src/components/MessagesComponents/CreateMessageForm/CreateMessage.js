import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addAMessage } from '../../../store/messages';
import './CreateMessageForm.css';

const CreateMessageForm = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const currentUser = useSelector(state => state.session.user);

    const [body, setBody] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        let newMessage = {
            senderId: currentUser.id,
            recipientId: parseInt(userId),
            body,
        }
        console.log(newMessage);
        await dispatch(addAMessage(newMessage))
        .then(() => setBody(''));
    }

    return (
        <>
            <section>
                <form onSubmit={handleSubmit}>
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