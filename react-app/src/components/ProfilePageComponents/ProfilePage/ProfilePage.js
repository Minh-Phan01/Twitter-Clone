import './ProfilePage.css'
import ProfilePagePostList from '../ProfilePagePostList/ProfilePagePostList'
import CreatePostForm from '../../PostComponents/CreatePostForm/CreatePostForm'
import { useSelector } from 'react-redux'


export const ProfilePage = () => {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <>
        { sessionUser && <CreatePostForm/>}
        <ProfilePagePostList />
        </>
    )
}

export default ProfilePage