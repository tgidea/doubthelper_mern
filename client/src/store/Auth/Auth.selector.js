import { createSelector } from 'reselect'
const selectAuthReducer = (state) => state.auth;
export const selectCurrentUser = createSelector(
    [selectAuthReducer],
    (authSlice) => authSlice.authData
)