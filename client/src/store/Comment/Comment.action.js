import * as api from '../../api';
import { COMMENT_ACTION_TYPES } from './Comment.types';
import { createAction } from '../createAction';

const commentActionCreateStart = () =>
    createAction(COMMENT_ACTION_TYPES.COMMENT_ACTION_CREATE_START);
const commentActionCreateSuccess = (commentArray) =>
    createAction(COMMENT_ACTION_TYPES.COMMENT_ACTION_CREATE_SUCCESS, commentArray);
const commentActionCreateFailed = (error) =>
    createAction(COMMENT_ACTION_TYPES.COMMENT_ACTION_CREATE_FAILED, error);

const commentActionFetchStart = () =>
    createAction(COMMENT_ACTION_TYPES.COMMENT_ACTION_FETCH_START);
const commentActionFetchSuccess = (commentArray) =>
    createAction(COMMENT_ACTION_TYPES.COMMENT_ACTION_FETCH_SUCCESS, commentArray);
const commentActionFetchFailed = (error) =>
    createAction(COMMENT_ACTION_TYPES.COMMENT_ACTION_FETCH_FAILED, error);

const commentActionDeleteStart = () =>
    createAction(COMMENT_ACTION_TYPES.COMMENT_ACTION_DELETE_START);
const commentActionDeleteSuccess = (commentArray) =>
    createAction(COMMENT_ACTION_TYPES.COMMENT_ACTION_DELETE_SUCCESS, commentArray);
const commentActionDeleteFailed = (error) =>
    createAction(COMMENT_ACTION_TYPES.COMMENT_ACTION_DELETE_FAILED, error);

const addComment = (comment, commentArray) => {
    const newArr = commentArray;
    return [...newArr , comment];
}

export const createCommentAsync = (postId, formData, commentArray) => async (dispatch) => {
    dispatch(commentActionCreateStart());
    try {
        console.log(postId);
        const { data } = await api.createComment(postId, formData);
        dispatch(commentActionCreateSuccess(addComment(data, commentArray)));
    }
    catch (error) {
        dispatch(commentActionCreateFailed(error));
    }
}
export const fetchCommentAsync = (postId) => async (dispatch) => {
    dispatch(commentActionFetchStart());
    try {
        const { data } = await api.getComments(postId);        
        dispatch(commentActionFetchSuccess(data));
    }
    catch (error) {
        dispatch(commentActionFetchFailed(error));
    }
}
export const deleteCommentAsync = (postId, commentId) => async (dispatch) => {
    dispatch(commentActionDeleteStart());
    try {
        await api.deleteComment(postId, commentId);
        dispatch(commentActionDeleteSuccess());
    }
    catch (error) {
        dispatch(commentActionDeleteFailed(error));
    }
}

