// 3rd Party Libs
import { createMemoryHistory, match } from 'react-router';
import { loadOnServer } from 'redux-async-connect';

// Project Libs
import getHtml from './html';
import getRoutes from './routes';
import getStore from '../redux/store';

const store = getStore();
const routes = getRoutes();

export default function matchRoutes (req, res) {
    const history = createMemoryHistory(req.originalUrl);
    const location = req.url;

    match({history, routes, location}, (err, redirect, renderProps) => {
        if (err) {
            return res.status(500).send(err.message);
        }

        if (redirect) {
            return res.redirect(302, redirect.pathname + redirect.search);
        }

        if (!renderProps) {
            return res.status(404).send('Not Found');
        }

        return loadOnServer(renderProps, store).then(() => {
            const html = getHtml(renderProps, store);

            return res.status(200).send(html);
        });
    });
}
