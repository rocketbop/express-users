import { describe, expect, test, jest, beforeEach, beforeAll } from '@jest/globals';
import * as userService from './../../src/services/userService';
import User from './../../src/models/user';

import sequelize from '../../src/sequelize';

beforeEach(async () => {
    await sequelize.sync({ force: true });
});

describe('userService.create', () => {
    test.only('requires a valid email', async () => {
        const newUser = {
            name: 'Homer Simpson',
        };

        await expect(() => userService.create(newUser.name, '')).rejects.toThrow(
            'Email is not valid',
        );
    });
});
