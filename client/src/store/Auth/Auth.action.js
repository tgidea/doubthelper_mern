import * as api from '../../api';
import { AUTH_ACTION_TYPES } from './Auth.types';
import { createAction } from '../createAction';

export const userActionStart = () =>
    createAction(AUTH_ACTION_TYPES.AUTH_ACTION_START);

export const userActionFailed = (error) =>
    createAction(AUTH_ACTION_TYPES.AUTH_ACTION_FAILED, error);

export const setUserAction = (payload) => 
    createAction(AUTH_ACTION_TYPES.AUTH_ACTION_SETUSER, payload);

export const unsetUserAction = () => createAction(AUTH_ACTION_TYPES.AUTH_ACTION_UNSETUSER);

export const signInUserAsync = (formData) => async (dispatch) => {
    dispatch(userActionStart());
    try {
        const { data } = await api.signIn(formData);
        dispatch(setUserAction(data));
    } catch (error) {        
        dispatch(userActionFailed(error.response.data.message));
    }
}
export const signUpUserAsync = (formData) => async (dispatch) => {
    dispatch(userActionStart());
    try {        
        const { data } = await api.signUp(formData);
        dispatch(setUserAction(data));
    } catch (error) {
        dispatch(userActionFailed(error.response.data.message));
    }
}
export const signUpUserGoogleAsync = (credential) => async (dispatch) => {
    dispatch(userActionStart());
    try {

        const formData ={ credential};        
        const { data } = await api.signUpGoogle(formData);                
        dispatch(setUserAction(data));
    } catch (error) {
        console.log(error);
        dispatch(userActionFailed(error.response.data.message));
    }
}
export const signOutUserAsync = () => async (dispatch) => {
    dispatch(userActionStart());
    try {
        dispatch(unsetUserAction());
    } catch (error) {
        dispatch(userActionFailed(error.response.data.message));
    }
}

