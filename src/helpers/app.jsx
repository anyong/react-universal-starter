/* eslint react/display-name: 0, react/jsx-no-bind: 0, react/jsx-closing-bracket-location: 0 */

// 3rd Party Libs
import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';

// Project Libs
import getRoutes from './routes';
import getStore from '../redux/store';

const store = getStore();
const history = __CLIENT__ ? syncHistoryWithStore(browserHistory, store) : null;

export default function getAppComponent (renderProps) {
    return (
        <Provider store={store} key="provider">
        {__CLIENT__ ? (
            <Router history={history} render={props => <ReduxAsyncConnect {...props} history={history}/>}>
                {getRoutes()}
            </Router>
        ) : (
            <ReduxAsyncConnect {...renderProps}/>
        )}
        </Provider>
    );
}
