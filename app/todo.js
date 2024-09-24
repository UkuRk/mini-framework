import { createElement, render, clear } from "../framework/dom.js";
import { createState, getState, setState } from "../framework/state.js";
import { onEvent } from "../framework/events.js";
import { navigateTopath, onRouterChange } from "../framework/router.js";

const state = createState({
    todos: [],
    editingIndex: null,
})

function editTodo(index, newText) {
    const { todos } = getState()
    todos[index].text = newText
    setState({ todos, editingIndex: null })
    renderTodos()
}

function startEdit(index) {
    setState({ editingIndex: Number(index) })
    renderTodos()
}

function addTodo(text) {
    if (!text) return
    const { todos } = getState()
    setState({ todos: [...todos, { text, completed: false }] })
    renderTodos()
}

function toggleTodo(index) {
    const { todos } = getState()
    todos[index].completed = !todos[index].completed
    setState({ todos })
    renderTodos()
}

function removeTodo(index) {
    const { todos } = getState()
    todos.splice(index, 1)
    setState({ todos })
    renderTodos()
}

function removeCompleted() {
    const { todos } = getState()
    const filteredTodos = todos.filter((todo) => {
        return !todo.completed
    })
    setState({ todos: filteredTodos })
    renderTodos()
}

let currentFilter = 'all'
let amount = 0

function renderTodos() {
    amount = 0
    const { todos, editingIndex } = getState()
    clear(document.getElementById('app'))
    console.log(editingIndex)

    todos.forEach(todo => {
        if (!todo.completed) amount++
    })

    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed
        if (currentFilter === 'completed') return todo.completed
        return true
    })

    const todoList = createElement({
        tag: 'ul',
        attrs: { class: 'todo-box-ul' },
        children: filteredTodos.map((todo, index) => ({
            tag: 'div',
            attrs: { class: 'todoBox', 'data-index': index },
            children: [
                {
                    tag: 'div',
                    attrs: { class: 'button-and-li-div' },
                    children: [
                        {
                            tag: 'button',
                            attrs: { 'class': 'toggle', 'data-index': index },
                            children: ['✓']
                        },
                        editingIndex === index ? {
                            tag: 'input',
                            attrs: {
                                class: 'edit-input',
                                type: 'text',
                                value: todo.text,
                                'data-index': index,
                                id: 'edit-input'
                            }
                        } : {
                            tag: 'li',
                            attrs: { class: todo.completed ? 'completed' : '', 'data-index': index },
                            children: [todo.text]
                        },
                    ]
                },

                {
                    tag: 'button',
                    attrs: { 'class': 'destroy', 'data-index': index },
                    children: ['❌']
                }
            ]
        }))
    })

    const todoHeader = createElement({
        tag: 'h1',
        attrs: { class: 'header' },
        children: ['To do List']

    })

    const todoInput = createElement({
        tag: 'div',
        attrs: { class: 'todoDiv' },

        children: [
            todoHeader,
            {
                tag: 'div',
                attrs: { class: 'inputDiv' },
                children: [
                    {
                        tag: 'button',
                        attrs: { class: 'complete-all' }
                    },
                    {
                        tag: 'input',
                        attrs: { type: 'text', id: 'new-todo', placeholder: 'Add a new todo...' }
                    },
                    {
                        tag: 'button',
                        attrs: { id: 'add-todo' },
                        children: ['Add Todo']
                    }
                ]
            },
            todoList
        ]
    })

    render(todoInput, document.getElementById('app'))

    if (todos.length > 0) {
        const footer = createElement({
            tag: 'footer',
            attrs: { class: 'footer' },
            children: [{
                tag: 'p',
                attrs: { class: 'amount' },
                children: [
                    amount === 1 ? '1 item left!' : `${amount} items left!`
                ]
            }, {
                tag: 'button',
                attrs: { class: 'filter all', 'data-filter': 'all' },
                children: ['All'],
            }, {
                tag: 'button',
                attrs: { class: 'filter active', 'data-filter': 'active' },
                children: ['Active']
            }, {
                tag: 'button',
                attrs: { class: 'filter completed', 'data-filter': 'completed' },
                children: ['Completed']
            }, {
                tag: 'button',
                attrs: { class: 'clear completed' },
                children: ['Clear completed']
            }]
        })
        render(footer, document.getElementById('app'))
    }
    if (editingIndex || editingIndex === 0) {
        const input = document.getElementById('edit-input')
        if (input) input.focus()
    } else {
        const input = document.getElementById('new-todo')
        if (input) input.focus()
    }
}

function handleRoute(path) {
    switch (path) {
        case '/active':
            currentFilter = 'active'
            break
        case '/completed':
            currentFilter = 'completed'
            break
        default:
            currentFilter = 'all'
            break
    }
    renderTodos()
}

onRouterChange(handleRoute)

renderTodos()

onEvent('click', '.complete-all', (event) => {
    console.log(event)
    const { todos } = getState()
    const allCompleted = todos.every(todo => todo.completed)
    const updatedTodos = todos.map(todo => ({
        ...todo,
        completed: !allCompleted
    }))
    setState({ todos: updatedTodos })
    renderTodos()
})

onEvent('keypress', 'input#new-todo', (event) => {
    if (event.key === 'Enter') {
        const input = document.getElementById('new-todo')
        const newTodoText = input.value
        addTodo(newTodoText)
        input.value = ''
    }
})

onEvent('dblclick', 'li', (event) => {
    console.log(event)

    const index = event.target.getAttribute('data-index')
    console.log(index)
    startEdit(index)
})

onEvent('keypress', 'input.edit-input', (event) => {
    const index = event.target.getAttribute('data-index')
    if (event.key === 'Enter') {
        const newText = event.target.value
        editTodo(index, newText)
    }
})

onEvent('blur', 'input.edit-input', (event) => {
    const index = event.target.getAttribute('data-index')
    const newText = event.target.value
    editTodo(index, newText)
})


onEvent('click', 'button.clear.completed', () => {
    removeCompleted()
})

onEvent('click', 'button.filter', (event) => {
    const filter = event.target.getAttribute('data-filter')
    navigateTopath(`/${filter === 'all' ? '' : filter}`)
})

onEvent('click', '#add-todo', () => {
    const input = document.getElementById('new-todo')
    const newTodoText = input.value
    addTodo(newTodoText)
    input.value = ''
})

onEvent('click', 'button.toggle', (event) => {
    const index = event.target.getAttribute('data-index')
    console.log(index)
    toggleTodo(index)
})
onEvent('click', 'button.destroy', (event) => {
    const index = event.target.getAttribute('data-index')
    removeTodo(index)
})


addTodo('first todo')
addTodo('second todo')