const GET_MESSAGES = 'messages/getMessages';


//GET MESSAGES ACTION
const getMessages = (messages) => {
    return {
        type: GET_MESSAGES,
        messages
    }
}

//GET MESSAGES THUNK
export const getAllMessages = () => async (dispatch) => {
    const response = await fetch(`/api/messages/`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getMessages(data.messages));
        return data.messages;
    }
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
        default:
            return state;
    }
}