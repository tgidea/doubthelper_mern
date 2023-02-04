import {createSelector} from 'reselect'

export const selectCurrentSpace = (state) => {
    if(!state.space.currentSpace && localStorage.getItem("space")){
        return JSON.parse(localStorage.getItem("space"));
    }
    return state.space.currentSpace;
}

const selectDsReducer = (state) => state.space;

export const selectSpaceArray = createSelector(
    [selectDsReducer],
    ( spaceSlice ) => spaceSlice.spaceArray
)
