import { DS_ACTION_TYPES } from "./DS.types";
const INITIAL_STATE = {
    spaceArray : [],
    currentSpace : null,
    isLoading : false,
    error : null 
}

export const dsReducer = (state = INITIAL_STATE, action={}) => {
    const {type, payload} = action;
    switch(type){
        case DS_ACTION_TYPES.DS_ACTION_START:
            return{
                ...state,
                isLoading : true
            }
        case DS_ACTION_TYPES.DS_ACTION_SETESPACEARRAY :
            return {
                ...state, 
                spaceArray : payload,
                isLoading : false
            }
        case DS_ACTION_TYPES.DS_ACTION_SETCURRENTSPACE:            
            localStorage.setItem("space",JSON.stringify(payload))
            return{
                ...state,
                currentSpace : payload,
            }
        case DS_ACTION_TYPES.DS_ACTION_FAILED:            
            return {
                ...state,                
                isLoading : false,
                error : payload
            }
        default :
            return state
    }
}
