import OpenModalButton from '../../OpenModalButton';
import { useSelector, useDispatch } from 'react-redux';
import EditMessageModal from '../EditMessageModal/EditMessageModal';
import { deletedMessage } from '../../../store/messages';
import DeleteMessageButton from '../DeleteMessageButton/DeleteMessageButton';
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react';
import './MessageList.css';


export const MessageList = ({socketMessages, socket}) => {
    // const [messages, setMessages] = useState([])
    const isOwner = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const editThisMessage = (message) => {
        socket.emit("editMessage", message )
    }

    const deleteThisMessage = (messageId) => {
        socket.emit("deleteMessage", messageId)
    }
   

    

    return (
        <>
        
        <div className='message-list-container'>
            {socketMessages && socketMessages.map(message => {
                {
                    return <div className='message-container'>
                            <div className='messages-card-container'>
                                <img className='messages-profile-pic'src={message.senderInfo.profilePictureUrl} />
                                <div className='messages-body'>
                                 {message.body}
                                    </div>
                            </div>
                        
                        {isOwner.id === message.senderInfo.id && <div className='message-buttons-container'>
                            <OpenModalButton 
                                className='edit-message-modal-button'
                                buttonText={<i class="fa-sharp fa-solid fa-pen"></i>}
                                modalComponent={<EditMessageModal message={message} socket={socket} editThisMessage={editThisMessage}/>}
                            />
                            <DeleteMessageButton className='delete-message-button' message={message} socket={socket} deleteThisMessage={deleteThisMessage}/>
                            </div>}
                    </div>
                }
            })}
        </div>
        </>
    )
}

export default MessageList;