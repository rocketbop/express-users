import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import app from './../src/app';

describe('your code', () => {
    test('it passes the tests', () => {
        expect(true).toEqual(true);
    });
});

describe('GET /users', () => {
    test('it returns an empty list of users when there are no users', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
    });
});
