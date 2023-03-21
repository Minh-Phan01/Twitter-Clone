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

    return (
        <>
        <h3>PostCard</h3>
        <div>
            <div>
                <img src={post.userInfo.profilePictureUrl} />
                <p>{post.userInfo.firstName} {post.userInfo.lastName}</p>
            </div>
            <h4>{post.body}</h4>
            <div>
                <div>
                    {(sessionUser && post.userId === sessionUser.id) && <button onClick={editedPostInfo}>Edit Post</button>}
                    {(sessionUser && post.userId === sessionUser.id) && <button onClick={deleteButton}>Delete Post</button>}
                </div>
            </div>
        </div>
        </>
    )
}

export default PostCard


