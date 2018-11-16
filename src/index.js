/**
 * Created by folgerfan on 2018/11/13.
 */
import xs from 'xstream'
import {run} from '@cycle/run'
import {makeDOMDriver, div} from '@cycle/dom'
import {makeHTTPDriver} from '@cycle/http'
import TodoForm from './todoForm/main'
import TodoList from './todoList/main'
function main(sources) {
    let todoForm = TodoForm(sources);
    let todoList = TodoList(sources);
    let vdom$ = xs.combine(todoForm.vdom$, todoList.vdom$)
        .map(([todoFormVDom, todoListVDom]) => {
            return div([todoFormVDom, todoListVDom])
        });
    let http$ = xs.merge(todoForm.http$, todoList.http$);
    return {
        DOM: vdom$,
        HTTP: http$
    }
}
run(main, {
    DOM: makeDOMDriver('#app'),
    HTTP: makeHTTPDriver()
});
