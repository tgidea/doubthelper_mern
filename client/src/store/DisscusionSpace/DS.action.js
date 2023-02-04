import * as api from '../../api';
import { DS_ACTION_TYPES } from './DS.types';
import { createAction } from '../createAction';

const dsActionStart = () =>
    createAction(DS_ACTION_TYPES.DS_ACTION_START);

const dsActionFailed = (error) =>
    createAction(DS_ACTION_TYPES.DS_ACTION_FAILED, error);

const setCurrentSpaceAction = (payload) => 
    createAction(DS_ACTION_TYPES.DS_ACTION_SETCURRENTSPACE, payload);

export const setSpaceArrayAction = (payload) => 
    createAction(DS_ACTION_TYPES.DS_ACTION_SETESPACEARRAY, payload);


export const createSpaceAsync = () => async (dispatch) => {    
    dispatch(dsActionStart());
    try {
        const { data } = await api.create();        
        dispatch(setSpaceArrayAction(data));
    } catch (error) {
        console.log(error);
        dispatch(dsActionFailed(error.message));
    }
}
export const setCurrentSpaceAsync = (space) => async (dispatch) => {
    dispatch(dsActionStart());
    try {
        dispatch(setCurrentSpaceAction(space));
    } catch (error) {
        console.log(error);
        dispatch(dsActionFailed(error.message));
    }
}

