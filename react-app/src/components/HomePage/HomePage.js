import './HomePage.css'
import { PostList } from '../PostComponents/PostList/PostList'
import { useSelector } from 'react-redux'
import CreatePostForm from '../PostComponents/CreatePostForm/CreatePostForm'

export const HomePage = () => {
const sessionUser = useSelector(state => state.session.user);
console.log(sessionUser)

    return (
        <>
           { sessionUser && <CreatePostForm /> }
            <PostList />
        </>
    )
}