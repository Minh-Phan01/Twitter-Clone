import './DeleteMessageButton.css';
import { useDispatch } from 'react-redux';
import { deletedMessage } from '../../../store/messages';

const DeleteMessageButton = ({message}) => {
    const dispatch = useDispatch();
    const deleteButton = (e) => {
        const accept = window.confirm('Deleting Message');
        if (accept) {
            dispatch(deletedMessage(message.id))
        }
    }
    
    return (
        <button onClick={deleteButton}>Delete Message!</button>
    )
}

export default DeleteMessageButton;