/**
 * Created by folgerfan on 2018/11/16.
 */
import intent from './intent'
import model from './model'
import view from './view'

export default function main(sources) {
    let intent$ = intent(sources.DOM);
    let model$ = model(intent$);
    let {saveRequest$, save$} = model$;
    let view$ = view(save$);
    return {
        vdom$: view$.vdom$,
        http$: saveRequest$
    }
}