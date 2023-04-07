import './AllUsersCard.css';
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const AllUsersCard = ({user}) => {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    console.log(user)
    
    const handleClick = () => {
        return history.push(`/messages/${user.id}`)
    }

    return (
        <>
        <div>
            <img src={user.profilePictureUrl} /> 
            <NavLink to={`/users/${user.id}`} className='user-profile-link'>{user.firstName} {user.lastName}</NavLink>
            <button onClick={handleClick}><i class="fa-solid fa-message"></i></button>
        </div>
        </>
    )
}

export default AllUsersCard;