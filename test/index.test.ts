import { describe, expect, test, jest, beforeEach, beforeAll } from '@jest/globals';
import request from 'supertest';
import app from './../src/app';
import sequelize from '../src/sequelize';

beforeEach(async () => {
    await sequelize.sync({ force: true });
});

describe('POST /users', () => {
    test('should create a new user and return a status code of 201', async () => {
        const newUser = {
            name: 'Bart Simpson',
            email: 'bart@example.com',
        };

        const response = await request(app).post('/users').send(newUser);

        expect(response.body).toMatchObject(newUser);
        expect(response.status).toBe(201);
    });

    test('reports an error when a validation fails', async () => {
        const newUser = {
            name: 'Bart Simpson',
            email: 'bart',
        };

        const response = await request(app).post('/users').send(newUser);

        expect(response.status).toBe(400);
        expect(response.body['error']).toMatch(/Validation Error: Email is not valid/);
    });
});

describe('GET /users', () => {
    let newBartUser: {};
    let newLisaUser: {};

    beforeAll(() => {
        newBartUser = {
            name: 'Bart Simpson',
            email: 'bart@example.com',
        };

        newLisaUser = {
            name: 'Lisa Simpson',
            email: 'lisa@example.com',
        };
    });

    test('it returns an empty list of users when there are no users', async () => {
        const response = await request(app).get('/users');

        expect(response.body).toEqual([]);
        expect(response.status).toBe(200);
    });

    test('it returns users where present', async () => {
        await request(app).post('/users').send(newBartUser);
        const response = await request(app).get('/users');

        const user = response.body[0];
        expect(user).toMatchObject(newBartUser);
        expect(response.status).toBe(200);
    });

    test('it returns results sorted with oldest first when created:asc is passed as a param', async () => {
        await request(app).post('/users').send(newBartUser);
        await request(app).post('/users').send(newLisaUser);
        const response = await request(app).get('/users').query({ created: 'ASC' });

        expect(response.status).toBe(200);

        expect(response.body[0]).toMatchObject({ name: 'Bart Simpson' });
        expect(response.body[1]).toMatchObject({ name: 'Lisa Simpson' });
    });

    test('it returns results sorted with newest first when created:desc is passed as a param', async () => {
        await request(app).post('/users').send(newBartUser);
        await request(app).post('/users').send(newLisaUser);
        const response = await request(app).get('/users').query({ created: 'DESC' });

        expect(response.status).toBe(200);

        expect(response.body[0]).toMatchObject({ name: 'Lisa Simpson' });
        expect(response.body[1]).toMatchObject({ name: 'Bart Simpson' });
    });

    test('it returns results sorted with oldest first for invalid string values of `created`', async () => {
        await request(app).post('/users').send(newBartUser);
        await request(app).post('/users').send(newLisaUser);

        const response = await request(app)
            .get('/users')
            .query({ created: 'Unfinished monkey business' });

        expect(response.status).toBe(200);

        expect(response.body[0]).toMatchObject({ name: 'Bart Simpson' });
        expect(response.body[1]).toMatchObject({ name: 'Lisa Simpson' });
    });

    test('it returns results sorted with oldest first for non string values of `created`', async () => {
        await request(app).post('/users').send(newBartUser);
        await request(app).post('/users').send(newLisaUser);

        const response = await request(app).get('/users').query({ created: 10000 });

        expect(response.status).toBe(200);

        expect(response.body[0]).toMatchObject({ name: 'Bart Simpson' });
        expect(response.body[1]).toMatchObject({ name: 'Lisa Simpson' });
    });
});
