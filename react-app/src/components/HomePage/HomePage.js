import './HomePage.css'
import { PostList } from '../PostComponents/PostList/PostList'
import { useSelector } from 'react-redux'
import CreatePostForm from '../PostComponents/CreatePostForm/CreatePostForm'
import SearchBar from '../SearchBar/SearchBar'
import AllUsers from '../AllUsersComponents/AllUsersList/AllUsers'

export const HomePage = () => {
const sessionUser = useSelector(state => state.session.user);


    return (
        <div className='home-page'>
            <div className='home-page-container-1'>
                { sessionUser && <CreatePostForm className='create-post-form'/> }
            </div>
            <div className='home-page-container-2'>
                <PostList className='post-list-home-page'/>
            </div>
            <div className='users-container'>
                { sessionUser && <SearchBar className='search-bar'/> }
                {sessionUser && <AllUsers />}
            </div>
        </div>
        
    )
}