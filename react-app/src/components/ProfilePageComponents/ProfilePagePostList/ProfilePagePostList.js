import './ProfilePagePostList.css'
import { useParams, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import PostCard from '../../PostComponents/PostCard/PostCard'
import { getAllPosts} from "../../../store/posts"

export const ProfilePagePostList = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [isLoaded, setisLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);

    const postsObj = useSelector(state => state.postsReducer);
    const userPosts = Object.values(postsObj).filter(post => post.userId == userId);
    const sortedUserPosts = userPosts.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
    })
    // const userPosts = allPosts.filter(post => post.userId == userId)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    if (isLoaded && (sessionUser.id !== userId)) {
        return <Redirect to='/' />
    }

    return (
        <>
            {sessionUser && <h1>{sessionUser.firstName}'s' Posts</h1>}
            <div>
                {sortedUserPosts &&
                    sortedUserPosts.map(post => {
                        {
                            return <div>
                                <PostCard post={post} />
                            </div>
                        }
                    })}
            </div>
        </>
    )
}

export default ProfilePagePostList;