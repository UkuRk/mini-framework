let globalState = {}

export function createState(initialState) {
    globalState = { ...initialState }
}

export function getState() {
    return globalState
}

export function setState(newState) {
    globalState = { ...globalState, ...newState }
}

