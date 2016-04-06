/* eslint react/no-danger: 0 */

// 3rd Party Libs
import React, { Component, PropTypes } from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';

// Project Libs
import getApp from './app';

class Html extends Component {
    static displayName = 'Html';

    static propTypes = {
        component: PropTypes.node,
        store: PropTypes.object,
    };

    render () {
        const { component, store } = this.props;
        const content = component ? renderToString(component) : '';

        return (
            <html>
                <body>
                    <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
                    <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}}/>
                    {__DEV__ ? <script src="http://127.0.0.1:8080/webpack-dev-server.js"/> : null}
                    {__DEV__ ? <script src="http://127.0.0.1:8080/client.js"/> : <script src="/client.js"/>}
                </body>
            </html>
        );
    }
}

export default function getHtml (renderProps, store) {
    return renderToString(<Html component={getApp(renderProps)} store={store}/>);
}
