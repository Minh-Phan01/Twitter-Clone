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
        <h1>Message List!</h1>
        <div>
            {socketMessages && socketMessages.map(message => {
                {
                    return <div>
                            <div>
                                <img src={message.senderInfo.profilePictureUrl} />
                                 {message.body}
                            </div>
                        
                        {isOwner.id === message.senderInfo.id && <div>
                            <OpenModalButton 
                                buttonText={"Edit Message"}
                                modalComponent={<EditMessageModal message={message} socket={socket} editThisMessage={editThisMessage}/>}
                            />
                            <DeleteMessageButton message={message} socket={socket} deleteThisMessage={deleteThisMessage}/>
                            </div>}
                    </div>
                }
            })}
        </div>
        </>
    )
}

export default MessageList;