/* eslint react/display-name: 0 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {
    Master,
    Home,
    Example,
} from '../containers';

function getRoutes () {
    return (
        <Route path="/" component={Master}>
            <IndexRoute component={Home}/>
            <Route path="example" component={Example}/>
        </Route>
    );
}

export default getRoutes;
