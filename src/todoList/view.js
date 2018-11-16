import {button, div} from '@cycle/dom'
export default function view($list) {
    return {
        vdom$:$list.map((list) => {
            return div(list.map(todo => div({}, [
                todo.description,
                button('.remove-btn', {
                    attrs: {
                        'data-todo-id': todo.id
                    }
                }, '删除')
            ])))
        })
    }
}