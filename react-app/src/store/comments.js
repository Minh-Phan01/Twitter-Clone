const GET_COMMENTS = 'comments/getComments';
const CREATE_COMMENT = 'comments/createComment';
const DELETE_COMMENT = 'comments/deleteComment';


//GET COMMENTS ACTION
const getComments = (comments) => {
    return {
        type: GET_COMMENTS,
        comments
    }
}


//CREATE COMMENT ACTION
const addComment = (payload) => {
    return {
        type: CREATE_COMMENT,
        payload
    }
}


//DELETE COMMENT ACTION
const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}


//GET COMMENTS THUNK
export const getAllComments = () => async (dispatch) => {
    const response = await fetch('/api/comments/');
    if (response.ok) {
        const data = await response.json();
        dispatch(getComments(data));
        return data;
    }
}


//CREATE COMMENT THUNK
export const createComment = (newComment) => async (dispatch) => {
    const {userId, postId} = newComment;
    const response = await fetch(`/api/comments/users/${userId}/${postId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newComment)
    })

    if (response.ok) {
        let addedComment;
        addedComment = await response.json();
        dispatch(addComment(addedComment));
    }
    return response;
}


//DELETE COMMENT THUNK
export const deletedComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}/delete`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(deleteComment(commentId))
    }
}

const initialState = {}

export const commentsReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_COMMENTS:
            newState = {}
            action.comments.comments.forEach(comment => {
                newState[comment.id] = comment;
            })
            return newState;
        case CREATE_COMMENT: 
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_COMMENT:
            delete newState[action.commentId];
            return newState;
        default:
            return state;
    }
}