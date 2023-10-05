import { describe, expect, test, jest, beforeEach, beforeAll } from '@jest/globals';
import buildOptions, { QueryOptionsType, SortDirections } from './../src/utilities/buildOptions';

describe('buildOptions', () => {
    test('should return an empty object when created is not provided', () => {
        const options = buildOptions();
        expect(options).toEqual({});
    });

    test('should return an empty object when created is an invalid value', () => {
        const invalidQuery: QueryOptionsType = { created: 'INVALID' };
        const options = buildOptions(invalidQuery);
        expect(options).toEqual({});
    });

    test('should return options object with order when created is ASC', () => {
        const validQuery: QueryOptionsType = { created: SortDirections.ASC };
        const options = buildOptions(validQuery);
        expect(options).toEqual({ order: [['createdAt', SortDirections.ASC]] });
    });

    test('should return options object with order when created is DESC', () => {
        const validQuery: QueryOptionsType = { created: SortDirections.DESC };
        const options = buildOptions(validQuery);
        expect(options).toEqual({ order: [['createdAt', SortDirections.DESC]] });
    });
});
