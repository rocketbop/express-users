/**
 * This module handles the Express app
 * Includes two routes for getting and creating users
 * @module app
 */

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import User from './models/user';
import * as UserController from './controllers/userController';
import sequelize from './sequelize';

const app: Express = express();
app.use(cors()).use(express.json()).options('*', cors());

app.get('/users', UserController.index);
app.post('/users', UserController.create);

export default app;
