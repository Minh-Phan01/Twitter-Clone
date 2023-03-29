import OpenModalButton from '../../OpenModalButton';
import { useSelector, useDispatch } from 'react-redux';
import EditMessageModal from '../EditMessageModal/EditMessageModal';
import { deletedMessage } from '../../../store/messages';
import DeleteMessageButton from '../DeleteMessageButton/DeleteMessageButton';
import './MessageList.css';


export const MessageList = ({messages}) => {
    const isOwner = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const deleteButton = (e) => {
        const accept = window.confirm('Deleting Message');
        if (accept) {
            dispatch(deletedMessage())
        }
    }

    return (
        <>
        <h1>Message List!</h1>
        <div>
            {messages && messages.map(message => {
                {
                    return <div>
                        {message.senderInfo.firstName}: {message.body}
                        {isOwner.id === message.senderInfo.id && <div>
                            <OpenModalButton 
                                buttonText={"Edit Message"}
                                modalComponent={<EditMessageModal message={message}/>}
                            />
                            <DeleteMessageButton message={message}/>
                            </div>}
                    </div>
                }
            })}
        </div>
        </>
    )
}

export default MessageList;