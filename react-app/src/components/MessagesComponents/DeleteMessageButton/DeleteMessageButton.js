import './DeleteMessageButton.css';
import { useDispatch } from 'react-redux';
import { deletedMessage } from '../../../store/messages';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';


const DeleteMessageButton = ({message, socket, deleteThisMessage}) => {
    const dispatch = useDispatch();
    
    const deleteButton = (e) => {
        const accept = window.confirm('Deleting Message');
        if (accept) {
            dispatch(deletedMessage(message.id))
            .then(() => deleteThisMessage(message.id))
        }
    }
    
    // useEffect(() => {
    //     socket.on("deleteMessage", )
    // })

    return (
        <button onClick={deleteButton}>Delete Message!</button>
    )
}

export default DeleteMessageButton;