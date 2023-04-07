import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletedPost } from "../../../store/posts";
import './PostCard.css'

export const PostCard = ({post}) => {
    const history = useHistory();
    const dispatch = useDispatch();
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
                {(sessionUser && post.userId === sessionUser.id) && <button onClick={editedPostInfo}><i class="fa-solid fa-pen"></i></button>}
                {(sessionUser && post.userId === sessionUser.id) && <button onClick={deleteButton}><i class="fa-solid fa-trash"></i></button>}
                
            </div>
        </div>
        </>
    )
}

export default PostCard


