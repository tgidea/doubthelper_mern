import {createSelector} from 'reselect'

const selectPostReducer = (state) => state.posts;

export const selectPosts = createSelector(
    [selectPostReducer],
    ( postSlice ) => postSlice.postsArray
)