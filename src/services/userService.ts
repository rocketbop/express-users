/**
 * @module userService
 * A service to separate controller and model
 * We can test the function in isolation
 */
import User from '../models/user';
import ValidationError from './../errors/validationError';

/**
 * This could be refactored out into a validations module
 * and tested in isolation
 */
const emailValid = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

const create = async (name: string, email: string): Promise<any> => {
    if (!emailValid(email)) {
        throw new ValidationError('Email is not valid');
    } else {
        const user = await User.create({ name, email });
        return user;
    }
};

export { create };
