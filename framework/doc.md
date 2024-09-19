
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
