/**
 * Created by folgerfan on 2018/11/16.
 */
export default function intent(DOM) {
    let input$ = DOM.select('.input').events('input').map(e => e.target.value).map(value => ({
        type: 'input',
        value
    }));
    let add$ = DOM.select('.add-btn').events('click').mapTo({
        type: 'add'
    });
    return {
        input$,
        add$
    }
}