import { COMMENT_ACTION_TYPES } from "./Comment.types";
const INITIAL_STATE = {
    commentArray : [],
    isLoadingFetch : false,
    isLoadingCreate : false,
    isLoadingDelete : false,
    errorFetch : null ,
    errorCreate : null ,
    errorDelete : null ,
}

export const commentReducer = (state = INITIAL_STATE, action={}) => {
    const {type, payload} = action;
    switch(type){
        case COMMENT_ACTION_TYPES.COMMENT_ACTION_CREATE_START:
            return{
                ...state,
                isLoadingCreate : true
            }
        case COMMENT_ACTION_TYPES.COMMENT_ACTION_CREATE_SUCCESS :
            return {
                ...state, 
                commentArray : payload,
                isLoadingCreate : false
            }
        case COMMENT_ACTION_TYPES.COMMENT_ACTION_CREATE_FAILED :
            return {
                ...state, 
                errorCreate : payload,
                isLoadingCreate : false
            }
        case COMMENT_ACTION_TYPES.COMMENT_ACTION_DELETE_START:
            return{
                ...state,
                isLoadingDelete : true
            }
        case COMMENT_ACTION_TYPES.COMMENT_ACTION_DELETE_SUCCESS :
            return {
                ...state, 
                commentArray : payload,
                isLoadingDelete : false
            }
        case COMMENT_ACTION_TYPES.COMMENT_ACTION_DELETE_FAILED :
            return {
                ...state, 
                errorDelete : payload,
                isLoadingDelete : false
            }
        case COMMENT_ACTION_TYPES.COMMENT_ACTION_FETCH_START:
            return{
                ...state,
                isLoadingFetch : true
            }
        case COMMENT_ACTION_TYPES.COMMENT_ACTION_FETCH_SUCCESS :
            return {
                ...state, 
                commentArray : payload,
                isLoadingFetch : false
            }
        case COMMENT_ACTION_TYPES.COMMENT_ACTION_FETCH_FAILED :
            return {
                ...state, 
                errorFetch : payload,
                isLoading : false
            }
        default :
            return state
    }
}
