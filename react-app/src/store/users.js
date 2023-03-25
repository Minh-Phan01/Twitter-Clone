const GET_USERS = 'users/getUsers';

//GET ALL USERS ACTION
const getUsers = (users) => {
    return {
        type: GET_USERS,
        users
    }
}

export const getAllUsers = () => async (dispatch) => {
    const response = await fetch('api/users/');
    if (response.ok) {
        const users = await response.json();
        dispatch(getUsers(users));
        return users;
    }
}

const initialState = {}

export const usersReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch(action.type) {
        case GET_USERS: {
            action.users.users.forEach(user => {
                newState[user.id] = user;
            })
            return newState;
        }
        default:
            return state;
    }
}