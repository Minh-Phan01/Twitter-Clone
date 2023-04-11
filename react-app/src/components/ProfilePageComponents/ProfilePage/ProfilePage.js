import './ProfilePage.css'
import AllUsers from '../../AllUsersComponents/AllUsersList/AllUsers'
import ProfilePagePostList from '../ProfilePagePostList/ProfilePagePostList'
import CreatePostForm from '../../PostComponents/CreatePostForm/CreatePostForm'
import { useSelector } from 'react-redux'


export const ProfilePage = () => {
    const sessionUser = useSelector(state => state.session.user);



    return (
        <>
        <div className='profile-page'>
            <div className='create-postlist-container'>
                 <div className='profile-create-post-container'>
                     { sessionUser && <CreatePostForm />}
                 </div>
                 <div className='profile-post-list-container'>
                      <ProfilePagePostList />
                 </div>
            </div>
            <div className='profile-all-users-container'>
                <AllUsers />
            </div>
        </div>
        </>
    )
}

export default ProfilePage