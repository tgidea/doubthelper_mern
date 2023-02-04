import { combineReducers } from "redux";
import { postReducer } from "./Post/post.reducer";
import { authReducer } from "./Auth/Auth.reducer";
import { dsReducer } from "./DisscusionSpace/DS.reducer";

export const rootReducer = combineReducers({
    posts : postReducer,
    auth : authReducer,
    space : dsReducer,
    // category : categoryReducer,
    // cart : cartReducer,
});