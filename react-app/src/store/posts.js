const GET_POSTS = 'posts/getPosts';
const CREATE_POST = 'posts/createPost';


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
        default:
            return state;
    }
}