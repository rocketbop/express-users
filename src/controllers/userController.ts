/**
 * @module userController
 * A controller module to separate out router from and dispatch and error
 * handling logic
 */
import { Request, Response } from 'express';
import User from '../models/user';
import * as UserService from './../services/userService';

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

const index = async (req: Request, res: Response) => {
    const options: any = buildOptions(req.query);
    const users = await User.findAll(options);

    res.status(200).send(users);
};

const create = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        const user = await UserService.create(name, email);
        res.status(201).json(user);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            res.status(400).json({ error: `Validation Error: ${error.message}` });
        } else {
            res.status(500).json({ error: `Internal Server Error` });
        }
    }
};

export { index, create };
