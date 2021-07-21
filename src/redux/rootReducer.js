/* eslint-disable no-case-declarations */
/* eslint-disable indent */
export function rootReducer(state, action) {
    switch (action.type) {
        case 'TABLE_RESIZE': 
            const storeState = state.colState || {}
            storeState[action.data.id] = action.data.value
            return {...state, colState: storeState} // id, sizevalue
        default: return state;
    }
}