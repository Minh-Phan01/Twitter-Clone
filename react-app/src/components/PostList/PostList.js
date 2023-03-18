import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { getAllPosts} from "../../store/posts"
import PostCard from '../PostCard/PostCard'
import { NavLink, useParams } from "react-router-dom";

import './PostList.css'

export const PostList = () => {
    const dispatch = useDispatch()
    const [isLoaded, setisLoaded] = useState(false);

    const postsObj = useSelector(state => state.postsReducer);
    console.log(postsObj)
    const allPosts = Object.values(postsObj)
    console.log(allPosts)

    useEffect(() => {
        dispatch(getAllPosts()).then(() => setisLoaded(true))
    }, [dispatch])


    return (
        <>
        <div>
            {postsObj &&
                allPosts.map(post => {
                    {
                        return <div>
                            <div>
                                <PostCard post={post}/>
                            </div>
                        </div>
                    }
                })}
        </div>
        </>
    )
}

export default PostList