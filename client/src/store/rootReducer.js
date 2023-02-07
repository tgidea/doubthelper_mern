import { combineReducers } from "redux";
import { postReducer } from "./Post/post.reducer";
import { authReducer } from "./Auth/Auth.reducer";
import { dsReducer } from "./DisscusionSpace/DS.reducer";
import { commentReducer } from "./Comment/Comment.reducer";

export const rootReducer = combineReducers({
    posts : postReducer,
    auth : authReducer,
    space : dsReducer,
    comment : commentReducer,
    // category : categoryReducer,
    // cart : cartReducer,
});