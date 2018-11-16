/**
 * Created by folgerfan on 2018/11/16.
 */
import {button, div, input} from '@cycle/dom'
export default function view(save$) {
    return {
        vdom$: save$.map(state => {
            return div([
                input('.input', {
                    props: {
                        type: 'text'
                    },
                    hook: {
                        update: (oldVNode, {elm}) => {
                            if (state.save) {
                                elm.value = '';
                            }
                        }
                    }
                }),
                button('.add-btn', '添加')
            ])
        })
    }

}