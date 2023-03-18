import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './PostCard.css'

export const PostCard = ({post}) => {
    // const history = useHistory();

    return (
        <>
        <h3>PostCard</h3>
        <div>
            <div>
                <img src={post.userInfo.profilePictureUrl} />
                <p>{post.userInfo.firstName} {post.userInfo.lastName}</p>
            </div>
            <h4>{post.body}</h4>
        </div>
        </>
    )
}

export default PostCard


