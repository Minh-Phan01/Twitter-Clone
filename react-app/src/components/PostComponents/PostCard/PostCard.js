import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletedPost } from "../../../store/posts";
import { getAllComments } from "../../../store/comments";
import { useEffect, useState } from "react";
import OpenModalButton from "../../OpenModalButton";
import CommentsList from "../../CommentsComponents/CommentsList/CommentsList";
import CreateCommentModal from "../../CommentsComponents/CreateCommentModal/CreateCommentModal";
import './PostCard.css'

export const PostCard = ({post}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)
    const commentsObj = useSelector(state => state.commentsReducer)
    const postComments = Object.values(commentsObj).filter(comment => comment.postId === post.id);

    const editedPostInfo = () => {
        history.push(`/posts/${post.id}/edit`)
    }

    const deleteButton = (e) => {
        const accept = window.confirm('Deleting Post');
        if (accept) {
            dispatch(deletedPost(post.id))
        }
    }

    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getAllComments()).then(() => setIsLoaded(true))
    }, [dispatch])



    //if user is not logged in, it breaks the code ----> profilePictureUrl --> look at EditPostForm & CreatePostForm (Home Page)
    return (
        <>
        <div className="post-border">
            <div className="profile-image-name">
                <img src={post.userInfo.profilePictureUrl} className='profile-pic'/>
                <p className="post-user-name">{post.userInfo.firstName} {post.userInfo.lastName}</p>
            </div>
            <h4 className="post-body">{post.body}</h4>
            <div>
                <div>
                {(sessionUser && post.userId === sessionUser.id) && <button onClick={editedPostInfo}><i class="fa-solid fa-pen"></i></button>}
                {(sessionUser && post.userId === sessionUser.id) && <button onClick={deleteButton}><i class="fa-solid fa-trash"></i></button>}
                </div>
                <div>
                { postComments.length > 0 && <OpenModalButton
                    className='post-comments-modal-button'
                    buttonText={`View ${postComments.length} Comments`}
                    modalComponent={<CommentsList postComments={postComments}/>}
                />}
                <OpenModalButton
                    className='create-comments-modal-button'
                    buttonText={'Add Comment'}
                    modalComponent={<CreateCommentModal post={post}/>}
                />
                </div>
            </div>
        </div>
        </>
    )
}

export default PostCard


