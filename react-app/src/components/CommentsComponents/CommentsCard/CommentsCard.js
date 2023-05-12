import { deletedComment } from '../../../store/comments'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useModal } from '../../../context/Modal';
import './CommentsCard.css'

const CommentsCard = ({comment}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const sessionUser = useSelector(state => state.session.user);
    
    const deleteButton = (e) => {
        const accept = window.confirm('Deleting Comment');
        if (accept) {
            dispatch(deletedComment(comment.id))
        }
        closeModal()
    }

    return (
        <>
        <div className='comment-card'>
             <div className='comment-container'>
                   <img className='profile-pic' src={comment.userInfo.profilePictureUrl}/>
                   <div className='comment-info'>{comment.userInfo.firstName} {comment.userInfo.lastName}: {comment.body}</div>
             </div>
             <div className='button-container'>
                 {(sessionUser && comment.userId === sessionUser.id) && <button onClick={deleteButton}><i class="fa-solid fa-trash"></i></button>}
             </div>

        </div>
        </>
    )
}

export default CommentsCard