import * as api from '../../api';
import { POSTS_ACTION_TYPES } from './post.types';
import { createAction } from '../createAction';

export const postsActionStart = () =>
    createAction(POSTS_ACTION_TYPES.POSTS_ACTION_START);

export const postsActionSuccess = (postArray) =>
    createAction(POSTS_ACTION_TYPES.POSTS_ACTION_SUCCESS, postArray);

export const postsActionFailed = (error) =>
    createAction(POSTS_ACTION_TYPES.POSTS_ACTION_FAILED, error);

const setRoomData = (roomData) => {
    return { ...roomData };
}
const addNewPostToRoomData = (post, roomData) => {
    let newPostArray = roomData.posts;    
    return { ...roomData, posts: [...newPostArray, post] }
}
const deletePost = (postId, roomData) => {
    const newArray = roomData.posts;
    let updatedPost = newArray.filter((post) => post._id !== postId);
    return {
        ...roomData,
        posts: updatedPost
    }
}
const updatePost = (newPost, roomData) => {
    const newArray = roomData.posts;
    let updatedPost = newArray.map((currPost) => currPost._id === newPost._id ? newPost : currPost);
    return {
        ...roomData,
        posts: updatedPost
    }
}

export const fetchPostsAsync = (space) => async (dispatch) => {    
    try {
        const { data } = await api.fetchPosts(space);        
        dispatch(postsActionSuccess(setRoomData(data)));
    } catch (error) {
        console.log(error);
        window.alert("Please recheck your space id")        
    }
}
export const createPostsAsync = (space, post, roomData) => async (dispatch) => {
    dispatch(postsActionStart());
    try {        
        const { data } = await api.createPosts(space, post);        
        dispatch(postsActionSuccess(addNewPostToRoomData(data, roomData)));
    } catch (error) {
        if(error.message === "Network Error"){window.alert("Upto 3mb data transmission only.")}
        dispatch(postsActionFailed(error.message));
    }
}

export const deletePostsAsync = (postId, space, roomData) => async (dispatch) => {
    try {
        await api.deletePost(postId, space);
        dispatch(postsActionSuccess(deletePost(postId, roomData)));
    } catch (error) {
        console.log(error);        
    }
}
export const likePostsAsync = (postId, optionId, roomData = []) => async (dispatch) => {    
    try {
        const { data } = await api.likePost(postId, optionId);        
        dispatch(postsActionSuccess(updatePost(data, roomData)));
    } catch (error) {
        console.log(error);
    }
}