import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import app from './../src/app';

describe('POST /users', () => {
    test.only('should create a new user and return a status code of 201', async () => {
        const newUser = {
            name: 'Bart Simpson',
            email: 'bart@example.com',
        };

        const response = await request(app).post('/users').send(newUser);

        expect(response.body).toEqual({})
        expect(response.status).toBe(201);
    });
});

describe('GET /users', () => {
    test('it returns an empty list of users when there are no users', async () => {
        const response = await request(app).get('/users');

        expect(response.body).toEqual([]);
        expect(response.status).toBe(200);
    });
});
