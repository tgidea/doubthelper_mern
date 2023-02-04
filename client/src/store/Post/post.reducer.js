import { POSTS_ACTION_TYPES } from "./post.types";
const INITIAL_STATE = {
    postsArray: [],
    isLoading: false,
    error: null
}

export const postReducer = (state = INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case POSTS_ACTION_TYPES.POSTS_ACTION_START:
            return {
                ...state,
                isLoading: true
            }
        case POSTS_ACTION_TYPES.POSTS_ACTION_SUCCESS: {            
            return {
                ...state,
                isLoading: false,                
                postsArray: payload,
            }
        }
        case POSTS_ACTION_TYPES.POSTS_ACTION_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        default:
            return state;
    }
}