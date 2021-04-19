import { LOAD_POSTS, ADD_POST, REMOVE_POST } from '../keys/post';

export const loadPosts = () => {
    return async dispatch => {
        const response = await fetch(`${process.env.API_URL}/posts`);
        const posts = await response.json();

        dispatch({ type: LOAD_POSTS, payload: posts })
    }
}
