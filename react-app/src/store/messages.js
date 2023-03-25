const GET_MESSAGES = 'messages/getMessages';
const ADD_MESSAGE = 'messages/addMessage';


//GET MESSAGES ACTION
const getMessages = (messages) => {
    return {
        type: GET_MESSAGES,
        messages
    }
}

//ADD MESSAGE ACTION
const addMessages = (payload) => {
    return {
        type: ADD_MESSAGE,
        payload
    }
}

//GET MESSAGES THUNK
export const getAllMessages = (user1Id, user2Id) => async (dispatch) => {
    const response = await fetch(`/api/messages/users/${user1Id}/${user2Id}/`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getMessages(data.messages));
        return data.messages;
    }
}

//ADD MESSAGE THUNK
export const addAMessage = (newMessage) => async (dispatch) => {
    const {senderId, recipientId} = newMessage;
    const response = await fetch(`/api/messages/users/${recipientId}/${senderId}/`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(newMessage)
    })

    if (response.ok) {
        let addedMessage;
        addedMessage = await response.json();
        dispatch(addMessages(addedMessage));
    }

    return response;
}

const initialState = {}

export const messagesReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_MESSAGES:
            newState = {}
            action.messages.forEach(message => {
                newState[message.id] = message;
            })
            return newState
        case ADD_MESSAGE:
            newState[action.payload.id] = action.payload;
            return newState;
        default:
            return state;
    }
}