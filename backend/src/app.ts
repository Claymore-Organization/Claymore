import express, { Request, Response } from 'express';

import config from '../config.json';
import router from './routes';

const app = express();

app.use(router);

app.listen(config.port, () => {
    console.log(`server is listening on port ${config.port}`)
});
