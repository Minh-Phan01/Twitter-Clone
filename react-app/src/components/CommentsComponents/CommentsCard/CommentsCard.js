import { deletedComment } from '../../../store/comments'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import './CommentsCard.css'

const CommentsCard = ({comment}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    console.log(Number.isInteger(comment.id))
    const deleteButton = (e) => {
        
        const accept = window.confirm('Deleting Comment');
        if (accept) {
            dispatch(deletedComment(comment.id))
        }
    }

    return (
        <>
        <div>
              <img className='profile-pic' src={comment.userInfo.profilePictureUrl}/>
              <div>{comment.userInfo.firstName} {comment.userInfo.lastName}: {comment.body}</div>
        </div>
        <div>
            {(sessionUser && comment.userId === sessionUser.id) && <button onClick={deleteButton}><i class="fa-solid fa-trash"></i></button>}
        </div>
        </>
    )
}

export default CommentsCard