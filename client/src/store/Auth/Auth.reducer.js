import { AUTH_ACTION_TYPES } from "./Auth.types";
import {setSpaceArrayAction} from '../DisscusionSpace/DS.action';
const INITIAL_STATE = {
    authData : null,
    isLoading : false,
    error : null 
}

export const authReducer = (state = INITIAL_STATE, action={}) => {
    const {type, payload} = action;
    switch(type){
        case AUTH_ACTION_TYPES.AUTH_ACTION_START:
            return{
                ...state,
                isLoading : true
            }
        case AUTH_ACTION_TYPES.AUTH_ACTION_SETUSER :
            const credential = payload.credential;  
// setting the usesAll Space using disscussion section acion
            setSpaceArrayAction(payload.discussionSpace);          
            localStorage.setItem('profile',JSON.stringify({credential}))            
            return {
                ...state, 
                authData : payload.result,
                isLoading : false
            }
        case AUTH_ACTION_TYPES.AUTH_ACTION_UNSETUSER:
            localStorage.clear()
            return {
                ...state,
                authData : null,
                isLoading : false,
                error : false
            }
        case AUTH_ACTION_TYPES.AUTH_ACTION_FAILED:
            return{
                ...state,
                isLoading : false,
                error : payload
            }
        default :
            return state
    }
}
