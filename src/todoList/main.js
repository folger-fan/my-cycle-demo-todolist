/**
 * Created by folgerfan on 2018/11/16.
 */
import intent from './intent'
import model from './model'
import view from './view'

export default function main(sources) {
    let remove$ = intent(sources.DOM);
    let model$ = model(remove$,sources.HTTP);
    let {todoList$, request$} = model$;
    let view$ = view(todoList$);
    return {
        vdom$: view$.vdom$,
        http$: request$
    }
}