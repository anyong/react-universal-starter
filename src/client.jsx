import { render } from 'react-dom';

import { getApp } from './helpers';

const el = document.getElementById('content');

render(getApp(), el);
