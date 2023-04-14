import { createSelector } from 'reselect'
const selectAuthReducer = (state) => state.auth;

export const selectCurrentUser = createSelector(
    [selectAuthReducer],
    (authSlice) => authSlice.authData
)
export const selectIsLoading = createSelector(
    [selectAuthReducer],
    (authSlice) => authSlice.isLoading
)
export const selectIsError = createSelector(
    [selectAuthReducer],
    (authSlice) => authSlice.error
)
