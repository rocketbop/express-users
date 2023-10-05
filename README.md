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

### Validation

I added a validator to the UserService that checks an email is valid in terms of its structure. You could have a discussion about if validation should be here or in the User model. I used the Sequelize library, but it's nice to not have too coupled a persistence layer. Sequelize - I noticed after I wrote this - has some nice support for adding custom validators directly into the models. I added the NotNull validator there. I have left both approaches in as illustration of different ways to approach this but in a production app we'd decide on a preferred approach.

## Next Steps

If there was time and this was not a toy app, things we might do next include:

-   Add pagination to the results for the index GET.
    -   We don't mind returning all users when we have a small number, but eventually we'd want to return only a subset to avoid long and heavy payloads back to the client.
-   Pagination makes sense with a larger palette of filters.
    -   So we would add filters like `name=x`, and created_after=x`
    -   It's nice to be able to return partial text matches for strings so that name_like=simpson` can return all the Simpsons. Depending on the database this can be problematic so if we want to support that we should think about that when choosing our persistence engine.
-   Data updates
    -   We have no way to change our data at the moment so an update route that allows us to change values for a given record
-   Authorization
    -   We have no way to authenticate a user at the moment but we would eventually want to allow only admin users to get a list of all the users for privacy reasons.
-   Cacheing
    We can certainly cache GET index requests in a production application, so that we do not hit the database over and over again for the same query, and this can be refreshed at a short interval depending on business needs.
-   Validation
    -   We have an email validator in the users service. This should be put into its own module
