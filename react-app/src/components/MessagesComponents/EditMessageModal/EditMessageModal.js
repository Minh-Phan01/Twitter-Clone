import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editMessageThunk } from '../../../store/messages';
import { useModal } from '../../../context/Modal';
import './EditMessageModal.css';

const EditMessageModal = ({ message, socket, editThisMessage }) => {
    const [body, setBody] = useState(message?.body);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const { closeModal } = useModal();

    const handleSubmit = async e => {
        e.preventDefault();
        const payload = {
            id: message.id,
            senderId: message.senderInfo.id,
            recipientId: message.recipientInfo.id,
            body
        }
        
    await dispatch(editMessageThunk(payload))
    .then((message) => {
        console.log('handleSubmit:',message)
        editThisMessage(message)
    })
    closeModal();

    }

    return (
        
        <div className='edit-message-modal-container'>
            {currentUser && <h2 className='edit-message-header'><img className='profile-pic' src={currentUser.profilePictureUrl}/> {currentUser.firstName} {currentUser.lastName}</h2>}
            <section>
                <form onSubmit={handleSubmit}>
                    <div className='edit-message-text-container'>
                        <textarea 
                            className='edit-message-text-area'
                            type='text'
                            placeholder='Edit Message'
                            value={body}
                            onChange={e => setBody(e.target.value)}
                        />
                    </div>
                    <button className='edit-message-button' type='submit'>Edit It!</button>
                </form>
            </section>
        </div>
        
    )
}

export default EditMessageModal;