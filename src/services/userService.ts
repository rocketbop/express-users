/**
 * @module userService
 * A service to separate controller and model
 * We can test the function in isolation
 */
import User from '../models/user';

const create = async (name: string, email: string) => {
    const user = await User.create({ name, email });
    return user;
};

export { create };
