/**
 * This module handles environment configuration.
 * It loads environment variables from a .env file.
 * This encapculates dotenv and hides some of it away.
 * @module environment
 */

import * as dotenv from 'dotenv';

dotenv.config();

const environment = {
    port: process.env.PORT,
    persistence_storage: process.env.SEQUELIZE_STORAGE,
};

export default environment;
