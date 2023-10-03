import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();
app.use(cors()).use(express.json()).options('*', cors());

app.post('/users', (req: Request, res: Response) => {
    res.send({}).status(201);
});
app.get('/users', (req: Request, res: Response) => {
    res.send([]).status(200);
});

export default app;
