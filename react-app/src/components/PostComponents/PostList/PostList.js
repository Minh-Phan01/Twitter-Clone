import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { getAllPosts} from "../../../store/posts"
import PostCard from '../PostCard/PostCard'
import { NavLink, useParams } from "react-router-dom";
import CreatePostForm from '../CreatePostForm/CreatePostForm';

import './PostList.css'

export const PostList = () => {
    const dispatch = useDispatch()
    const [isLoaded, setisLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const postsObj = useSelector(state => state.postsReducer);
    const allPosts = Object.values(postsObj)
    let sortedPosts = allPosts.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
    })

    useEffect(() => {
        dispatch(getAllPosts()).then(() => setisLoaded(true))
    }, [dispatch])


    return (
        <div className='post-component'>
            <div className='post-list-create-container'>
                { sessionUser && <CreatePostForm className='post-list-create-form'/> }
            </div>
            <h1 className='post-component-title'>---------------Nosy Nancy-----------------</h1>
            <div className='post-list'>
               
                {postsObj &&
                    sortedPosts.map(post => {
                        {
                            return <div>
                                <div>
                                    <PostCard post={post}/>
                                </div>
                            </div>
                        }
                    })}
            </div>
        </div>
        
    )
}

export default PostList