import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();
app.use(cors()).use(express.json()).options('*', cors());

app.post('/users', (req: Request, res: Response) => {
    res.status(201).send({});
});
app.get('/users', (req: Request, res: Response) => {
    res.status(200).send([]);
});

export default app;
