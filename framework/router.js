export function onRouterChange(callback) {
    window.addEventListener('popstate', () => {
        callback(window.location.pathname)
    })
}

export function navigateTopath(path) {
    window.history.pushState({}, '', path)
    const popStateEvent = new PopStateEvent('popstate')
    dispatchEvent(popStateEvent)
}
