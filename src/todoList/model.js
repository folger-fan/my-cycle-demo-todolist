/**
 * Created by folgerfan on 2018/11/16.
 */

import xs from 'xstream'

export default function model(intent, HTTP) {
    let {remove$} = intent;

    let todoList$ = HTTP.select('todoList').flatten().map(res => res.body).startWith([]);
    let afterSave$ = HTTP.select('save').flatten().map(res => res.body).filter(({ret}) => ret === 0);
    let afterRemove$ = HTTP.select('remove').flatten().map(res => res.body).filter(({ret}) => ret === 0);

    let removeRequest$ = remove$.map(todoId => {
        return {
            url: 'http://localhost:3000/deleteTodo',
            category: 'remove',
            method: 'DEL',
            send: {
                todoId
            }
        }
    });

    const queryTodoList$ = xs.merge(afterSave$, afterRemove$, xs.of(1)).map(() => {
        console.log('query list');
        return {
            url: 'http://localhost:3000/todoList',
            category: 'todoList',
            method: 'GET'
        }
    });

    return {
        todoList$,
        request$: xs.merge(queryTodoList$, removeRequest$)
    }
}