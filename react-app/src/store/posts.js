const GET_POSTS = 'posts/getPosts';


//GET POSTS  ACTION
const getPosts = (posts) => {
    return {
        type: GET_POSTS,
        posts
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
        default:
            return state;
    }
}