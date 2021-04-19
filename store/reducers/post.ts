import { LOAD_POSTS } from '../keys/post';

interface IPost {
    id: number;
    title: string;
    body: string;
}

interface IPostState {
    allPosts: IPost[],
    bookedPosts: IPost[],
    loading: boolean,
}

const initialState: IPostState = {
    allPosts: [],
    bookedPosts: [],
    loading: true,
}

export const postReducer = (state = initialState, action): IPostState => {
    switch (action.type) {
        case LOAD_POSTS:
            return {
                ...state,
                allPosts: action.payload,
                bookedPosts: action.payload.filter(post => post.booked),
                loading: false
            }
        default:
            return state;
    }
}
