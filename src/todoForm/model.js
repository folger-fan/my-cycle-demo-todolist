/**
 * Created by folgerfan on 2018/11/16.
 */
import xs from 'xstream'

export default function model(intent$) {
    let {input$, add$} = intent$;
    let save$ = xs.merge(input$, add$).fold((state, action) => {
        if (action.type === 'input') {
            return {
                ...state,
                inputValue: action.value,
                save: false
            }
        }
        if (action.type === 'add') {
            return {
                ...state,
                save: true,
                inputValue:state.save?'':state.inputValue
            }
        }
    }, {
        type: 'inputDeal',
        inputValue: '',
        save: false
    });

    let saveRequest$ = save$.filter(state => state.save && !!state.inputValue).map(state => {
        return {
            url: 'http://localhost:3000/saveTodo',
            category: 'save',
            method: 'POST',
            send: {
                description: state.inputValue
            }
        }
    });

    return {
        saveRequest$,
        save$
    }
}