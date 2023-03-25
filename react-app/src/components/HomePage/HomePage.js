import './HomePage.css'
import { PostList } from '../PostComponents/PostList/PostList'
import { useSelector } from 'react-redux'
import CreatePostForm from '../PostComponents/CreatePostForm/CreatePostForm'
import SearchBar from '../SearchBar/SearchBar'

export const HomePage = () => {
const sessionUser = useSelector(state => state.session.user);


    return (
        <>
            { sessionUser && <CreatePostForm /> }
            <PostList />
            { sessionUser && <SearchBar /> }
        </>
    )
}