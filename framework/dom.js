export function createElement({ tag, attrs = {}, children = [] }) {
    const el = document.createElement(tag)

    Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]))

    if (!Array.isArray(children)) {
        children = [children]
    }

    children.forEach(child => {
        if (typeof child === 'string') {
            el.appendChild(document.createTextNode(child))
        } else if (child instanceof HTMLElement) {
            el.appendChild(child)
        } else if (child) {
            el.appendChild(createElement(child))
        }
    })

    return el
}


export function render(rootElement, container) {
    container.appendChild(rootElement)
}


export function clear(container) {
    container.innerHTML = ''
}