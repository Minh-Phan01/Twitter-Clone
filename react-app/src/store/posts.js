const GET_POSTS = 'posts/getPosts';
const CREATE_POST = 'posts/createPost';
const EDIT_POST = 'posts/editPost';
const DELETE_POST = 'posts/deletePost'


//GET POSTS ACTION
const getPosts = (posts) => {
    return {
        type: GET_POSTS,
        posts
    }
}

//CREATE POST ACTION
const addPost = (payload) => {
    return {
        type: CREATE_POST,
        payload
    }
}

//EDIT POST ACTION
const editPost = (payload) => {
    return {
        type: EDIT_POST,
        payload
    }
}


const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}


//GET ALL POSTS THUNK
export const getAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/');

    if (response.ok) {
        const data = await response.json();
        dispatch(getPosts(data));
        return data;
    }
}



// CREATE POST THUNK
export const createPost = (newPost) => async (dispatch) => {
   
    
    const response = await fetch(`/api/posts/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost)
    })
    
    if (response.ok) {
        let addedPost;
        addedPost = await response.json();
        dispatch(addPost(addedPost));
    }
    return response;
}

//EDIT A POST THUNK
export const editPostThunk = (postEdit) => async (dispatch) => {
    const { id, body } = postEdit
    const response = await fetch(`/api/posts/edit/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            body
        })
    })

    if (response.ok) {
        const editedPost = await response.json();
        dispatch(editPost(editedPost))
    }
    return response;
}


export const deletedPost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/delete`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(deletePost(postId))
    }
}


const initialState = {}

export const postsReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_POSTS:
            newState = {}
            action.posts.posts.forEach(post => {
                newState[post.id] = post;
            })
            return newState;
        case CREATE_POST:
            newState[action.payload.id] = action.payload;
            return newState
        case EDIT_POST:
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_POST:
            delete newState[action.postId];
            return newState;
        default:
            return state;
    }
}