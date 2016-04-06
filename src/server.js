// Node imports
import path from 'path';

// 3rd Party Libs
import express from 'express';

// Project Libs
import { matchRoutes } from './helpers';

const app = express();
const staticDir = path.join(__dirname, '../public');

app.use(express.static(staticDir));

app.get('*', matchRoutes);

export default app;
