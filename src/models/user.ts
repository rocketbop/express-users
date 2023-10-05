/**
 * This model defines our User
 * Our library handles timestamps so they aren't explicitly defined
 * Email needs to be unique
 * @module user
 */

import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Name cannot be null',
            },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

export default User;
