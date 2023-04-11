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
    console.log(profileUser);
    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAllUsers())
    }, [dispatch, getAllUsers])

    useEffect(() => {
        if (Object.keys(users).length > 0) {
            setisLoaded(true);
        }
    }, [users])

    if (isLoaded && (!profileUser.length)) {
        return <Redirect to='/' />
    }

    return (
        <>
            <div className='profile-page-container'>
                 {profileUser.length > 0 && <h1 className='profile-page-header'>{profileUser[0].firstName}'s Posts</h1>}
                 <div className='profile-page-posts-container'>
                     {sortedUserPosts &&
                         sortedUserPosts.map(post => {
                             {
                                 return <div>
                                     <PostCard post={post} className='profile-page-posts'/>
                                 </div>
                             }
                         })}
                 </div> 
            </div>
        </>
    )
}

export default ProfilePagePostList;