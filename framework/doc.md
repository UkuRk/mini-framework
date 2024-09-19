
# My Mini Framework Documentation

## Overview

This framework is a lightweight, functional JavaScript framework for building web applications. It allows developers to create, manipulate, and render DOM elements without relying on high-level libraries like React, Angular, or Vue.

## Features

- **Element Creation**: Easily create and manipulate HTML elements.
- **Event Handling**: Attach event listeners to elements effortlessly.
- **State Management**: Manage application state using a simple global state object.
- **Routing**: Navigate between different views with built-in support for browser history.

## Getting Started

To use the framework, include the `dom.js`, `events.js`, `state.js`, and `router.js` files in your HTML.

### Creating an Element

To create a new HTML element, use the `createElement` function.

```javascript
import { createElement } from './framework/dom.js';

const myDiv = createElement({
    tag: 'div',
    attrs: { class: 'my-class' },
    children: ['Hello, World!']
});

// Render the element into the DOM
document.body.appendChild(myDiv);
```

### Nesting Elements

You can nest elements by including them in the children array of the parent element.

```javascript
const myList = createElement({
    tag: 'ul',
    children: [
        {
            tag: 'li',
            children: ['Item 1']
        },
        {
            tag: 'li',
            children: ['Item 2']
        }
    ]
});

// Render the list
document.body.appendChild(myList);
```

### Adding Attributes to an Element

Attributes can be added using the attrs object when creating an element.


```javascript
const myButton = createElement({
    tag: 'button',
    attrs: { id: 'my-button', class: 'btn' },
    children: ['Click Me']
});

// Render the button
document.body.appendChild(myButton);
```

### Creating an Event

To handle events, use the onEvent function. This function listens for a specified event type on a given selector.


```javascript
import { onEvent } from './framework/events.js';

onEvent('click', '#my-button', () => {
    alert('Button clicked!');
});
```
### Explanation of How It Works

*    Element Creation: The createElement function constructs DOM elements by accepting a configuration object that defines the tag, attributes, and children. This approach allows for a flexible way to build elements programmatically.

*    Nesting Elements: The framework supports nesting by allowing child elements to be included within the parent element’s configuration, promoting a clear hierarchy and structure.

*    Event Handling: By using event delegation through the onEvent function, you can attach events to specific elements efficiently, improving performance and simplifying event management.

*    State Management: The framework manages global state using a simple object, allowing for easy tracking and updating of application state without complex data structures.

### Conclusion

This framework provides a minimalistic approach to building web applications. Its straightforward API allows for quick development and easy understanding. You can easily create elements, manage events, and handle state without the overhead of more complex libraries.