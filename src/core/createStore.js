export function createStore(rootReducer, initialState = {}) {
    let state = rootReducer({...initialState}, {type: '_INIT_'})
    let listeners = []

    return {
        subscribe(fn) {
            listeners.push(fn)
            // return () => {
            //     listeners = listeners.filter(listener => listener !== fn)
            // }
            return {
                unsubscribe() {
                    listeners = listeners.filter(listener => listener !== fn)
                }
            }
        },
        dispatch(action) {
            state = rootReducer(state, action)
            listeners.forEach(listener => listener(state))
        },
        getState() {
            return state
        }
    }
}