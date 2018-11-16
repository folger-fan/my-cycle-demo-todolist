/**
 * Created by folgerfan on 2018/11/16.
 */

export default function intent(DOM){
    let remove$ = DOM.select('.remove-btn').events('click').map(e => {
        let {todoId} = e.target.dataset;
        return todoId
    });

    return {
        remove$
    }
}