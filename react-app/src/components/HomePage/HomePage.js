import './HomePage.css'
import { PostList } from '../PostComponents/PostList/PostList'
import { useSelector } from 'react-redux'
import CreatePostForm from '../PostComponents/CreatePostForm/CreatePostForm'
import SearchBar from '../SearchBar/SearchBar'

export const HomePage = () => {
const sessionUser = useSelector(state => state.session.user);


    return (
        <div className='home-page'>
            { sessionUser && <CreatePostForm className='create-post-form'/> }
            <PostList className='post-list'/>
            { sessionUser && <SearchBar className='search-bar'/> }
        </div>
        
    )
}