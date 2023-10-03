/**
 * This module handles the Express app
 * Includes two routes for getting and creating users
 * @module app
 */

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import User from './models/user';
import sequelize from './sequelize';

const app: Express = express();
app.use(cors()).use(express.json()).options('*', cors());

// POST /users - Create a new user
app.post('/users', async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        const user = await User.create({ name, email });
        res.status(201).json(user);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            res.status(400).json({ error: `Validation Error: ${error.message}` });
        } else {
            res.status(500).json({ error: `Internal Server Error` });
        }
    }
});

// GET /users - Retrieve users with optional sorting
app.get('/users', async (req: Request, res: Response) => {
    const options: any = buildOptions(req.query);
    const users = await User.findAll(options);

    res.status(200).send(users);
});

interface QueryOptions {
    created?: string;
}

// Sequelize takes an options object, that can be quite complex
// We only support one query param right now though
const buildOptions = (query: QueryOptions = {}) => {
    const created = query['created'];
    if (created) {
        return {
            order: [['createdAt', created]],
        };
    } else {
        return {};
    }
};

export default app;
