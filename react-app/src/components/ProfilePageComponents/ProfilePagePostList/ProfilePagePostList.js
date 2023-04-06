import './ProfilePagePostList.css'
import { useParams, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import PostCard from '../../PostComponents/PostCard/PostCard'
import { getAllPosts} from "../../../store/posts"
import { getAllUsers } from '../../../store/users';

export const ProfilePagePostList = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [isLoaded, setisLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const users = useSelector(state => state.usersReducer)
    const profileUser = Object.values(users).filter(user => user.id == userId)
    const postsObj = useSelector(state => state.postsReducer);
    const userPosts = Object.values(postsObj).filter(post => post.userId == userId);
    const sortedUserPosts = userPosts.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
    })
    // const userPosts = allPosts.filter(post => post.userId == userId)
    
    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAllUsers())
        setisLoaded(true)
    }, [dispatch])

    if (isLoaded && (!profileUser.length)) {
        return <Redirect to='/' />
    }

    return (
        <>
            {profileUser.length > 0 && <h1>{profileUser[0].firstName}'s Posts</h1>}
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