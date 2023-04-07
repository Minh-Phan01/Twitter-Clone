import './AllUsers.css';
import { getAllUsers } from '../../../store/users';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllUsersCard from '../AllUsersCard/AllUsersCard';

export const AllUsers = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const allUsersObj = useSelector(state => state.usersReducer);
    const allUsers = Object.values(allUsersObj).filter(user => user.id !== sessionUser.id);
    
    

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch])

    return (
        <>
        <h1>All Users!</h1>
        <div>
            {allUsers && allUsers.map(user => {
                {
                    return <div>
                        <AllUsersCard user={user}/>
                    </div>
                }
            })}
        </div>
        </>
    )
}

export default AllUsers;