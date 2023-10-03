/**
 * This module is used to set up Sequelize which is an ORM
 * We have used the environment module to set the persistence
 * which is in memory for testing but using a file on development
 * mode. sqlite is great for prototyping but I'd use something else
 * in production
 * @module sequelize
 */

import { Sequelize } from 'sequelize';
import environment from './environment';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: environment.persistence_storage,
    logging: false,
});

export default sequelize;
