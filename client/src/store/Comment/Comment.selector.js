import {createSelector} from 'reselect'

const selectCommentReducer = (state) => state.comment;


export const selectCommentArray = createSelector(
    [selectCommentReducer],
    ( commentSlice ) => commentSlice.commentArray
)
export const selectIsLoadingFetch = createSelector(
    [selectCommentReducer],
    ( commentSlice ) => commentSlice.isLoadingFetch
)
export const selectIsLoadingCreate = createSelector(
    [selectCommentReducer],
    ( commentSlice ) => commentSlice.isLoadingCreate
)
export const selectIsLoadingDelete = createSelector(
    [selectCommentReducer],
    ( commentSlice ) => commentSlice.isLoadingDelete
)
