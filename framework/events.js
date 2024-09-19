export function onEvent(eventType, selector, callback) {
    document.addEventListener(eventType, event => {
        if (event.target.matches(selector)) {
            callback(event)
        }
    })
}