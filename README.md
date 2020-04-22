# backend

[![build status][ci-image]][ci-url]

Backend for [MyLims](https://github.com/mylims/mylims) project.

## Usage

```bash
docker-compose build
docker-compose up -d
docker-compose logs mylims_server
```

If the server is run outside the docker environment, it's necessary export the
following environmental variables:

- `DB_USER`: MongoDB username (checked against the `admin` database)
- `DB_PWD`: MongoDB password
- `DB_HOST`: MongoDB host address (default to localhost)
- `DB_PORT`: MongoDB port (default to 27017)

For the testings there's no necessary to run against a local database instance,
it is mocked using [jest mocks](https://github.com/shelfio/jest-mongodb).

## Files structure

Inside the `src` directory the entry file is `index.ts`, that creates the
server and joins the resolvers and schemas into production. There are also 4
files for each class that structure the project:

- schemas: GraphQL schemas for type definitions, queries and mutations.
- resolvers: GraphQL resolvers for queries and mutations.
- models: Classes for data manipulation and search.

Each class has these files named like this: `name.model.ts`, `name.resolver.ts`
and `name.schema.ts`. Also each test has the same name of the resource to test,
following the jest convention `resource.test.ts`, for example `model.test.ts`.

## License

[MIT](./LICENSE)

[ci-image]: https://github.com/mylims/backend/workflows/Node.js%20CI/badge.svg?branch=master
[ci-url]: https://github.com/mylims/backend/actions?query=workflow%3A%22Node.js+CI%22
