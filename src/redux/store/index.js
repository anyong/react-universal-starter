import { compose, createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

import reducer from '../reducer';

export default function getStore () {
    let data;

    if (__CLIENT__) {
        data = window.__data;
    }

    return createStore(
        reducer,
        data,
        compose(
            applyMiddleware(thunk),
            applyMiddleware(promise),
            applyMiddleware(routerMiddleware(browserHistory)),
            __DEV__ && __CLIENT__ && window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
}
