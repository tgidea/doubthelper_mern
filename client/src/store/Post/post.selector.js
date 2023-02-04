import {createSelector} from 'reselect'

const selectPostReducer = (state) => state.posts;

export const selectRoomData = createSelector(
    [selectPostReducer],
    ( postSlice ) => postSlice.roomData
)

export const selectIsLoading = createSelector(
    [selectPostReducer],
    ( postSlice ) => postSlice.isLoading
)