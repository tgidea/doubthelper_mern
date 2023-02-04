import * as api from '../../api';
import { POSTS_ACTION_TYPES } from './post.types';
import { createAction } from '../createAction';

export const postsActionStart = () =>
    createAction(POSTS_ACTION_TYPES.POSTS_ACTION_START);

export const postsActionSuccess = (postArray) =>
    createAction(POSTS_ACTION_TYPES.POSTS_ACTION_SUCCESS, postArray);

export const postsActionFailed = (error) =>
    createAction(POSTS_ACTION_TYPES.POSTS_ACTION_FAILED, error);

const addNewPostToArray = (post, postArray) => {    
    let newPostArray;
    if (postArray.length === 0) {
        newPostArray = [...postArray, post];
    }
    else {
        newPostArray = [{
            ...postArray[0],
            posts : [...postArray[0].posts, post]            
        }]
    }    
    return newPostArray;
}
const deletePost = (postId, postArray) => {
    const newArray = postArray[0].posts;
    let updatedPost = newArray.filter((post) => post._id !== postId);
    return [{
        ...postArray[0],
        posts : updatedPost
    }]
}

const updatePost = (postId, data, postArray) => {
    const newArray = postArray[0].posts;
    let updatedPost = newArray.map( (post) => post._id === data._id? data : post);
    return [{
        ...postArray[0],
        posts : updatedPost
    }]
}

export const fetchPostsAsync = (space) => async (dispatch) => {
    dispatch(postsActionStart());
    try {
        const { data } = await api.fetchPosts(space);
        dispatch(postsActionSuccess(addNewPostToArray(data, [])));
    } catch (error) {
        console.log(error);
        dispatch(postsActionFailed(error.message));
    }
}
export const createPostsAsync = (space, post, postArray) => async (dispatch) => {
    dispatch(postsActionStart());    
    try {
        const { data } = await api.createPosts(space, post);        
        dispatch(postsActionSuccess(addNewPostToArray(data, postArray)));
    } catch (error) {
        console.log(error);
        dispatch(postsActionFailed(error.message));
    }
}

export const deletePostsAsync = (postId, space, postArray) => async (dispatch) => {
    dispatch(postsActionStart());
    try {
        await api.deletePost(postId, space);        
        dispatch(postsActionSuccess(deletePost(postId, postArray)));
    } catch (error) {
        console.log(error);
        dispatch(postsActionFailed(error.message));
    }
}
export const likePostsAsync = (postId, optionId, postArray=[]) => async (dispatch) => {
    dispatch(postsActionStart());
    try {
        const { data } = await api.likePost(postId, optionId);
        dispatch(postsActionSuccess(updatePost(postId, data, postArray)));
    } catch (error) {
        console.log(error);
        dispatch(postsActionFailed(error.message));
    }
}