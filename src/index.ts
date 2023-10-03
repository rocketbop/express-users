/**
 * This is the entry point to the server.
 * It imports the app which is the Express routes and logic
 * I extracted the app module because I want to test it
 * without running the server
 */
import app from './app';
import sequelize from './sequelize';
import environment from './environment';

sequelize.sync();

const port = environment.port || 3111;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
