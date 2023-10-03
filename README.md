# Small Express app

This project skeleton contains a basic Express setup one endpoint to create a user and one endpoint to fetch all users, as well as a basic empty unit test.

## Getting up and running

-   `npm i`
-   Run the tests

## Scripts

`npm start` starts the server

`npm test` executes the tests

## API

1. POST /users creates a user in the DB with unique id, a name, a unique email address and a creation date
2. GET /users returns (all) users from the database.
    - This endpoint takes a query parameter `created` which sorts users by creation date ascending or descending.

## Libraries

### Testing

We use Jest with Supertest to making testing the API a breeze. We use SQLITE in memory for testing.

### Persistence

We use SQLITE in memory for testing. Sequelize provides the ORM.
