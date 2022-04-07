import express, { Request, Response } from 'express';

import config from '../config.json';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World')
});

app.listen(config.port, () => {
    console.log(`server is listening on port ${config.port}`)
});
