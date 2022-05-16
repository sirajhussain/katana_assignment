# RESTful Cards API Node Server

A RESTful Cards APIs using Node.js, Express, and Mongoose.

## Installation

For installation, follow these steps:

Clone the repo:

```bash
git clone --depth 1 https://github.com/sirajhussain/katana_assignment
cd katana_assignment
```

Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Commands

Running locally:

```bash
yarn dev
```

Running in production:

```bash
yarn start
```

Testing:

```bash
# run all tests
yarn test

# run all tests in watch mode
yarn test:watch

# run test coverage
yarn coverage
```

Docker:

```bash
# run docker container in development mode
yarn docker:dev

# run docker container in production mode
yarn docker:prod

# run all tests in a docker container
yarn docker:test
```

Linting:

```bash
# run ESLint
yarn lint

# fix ESLint errors
yarn lint:fix

# run prettier
yarn prettier

# fix prettier errors
yarn prettier:fix
```

## Environment Variables

The environment variables can be found in the `.env` file.

```bash
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/KatanaDB
```

### API Endpoints

List of available routes:

**Cards routes**:\
`POST /v1/cards/createdeck` - create a Deck\

```json
{
  "type": "FULL/SHORT",
  "shuffled": true
}
```

`GET /v1/cards/opendeck/:deckId` - open Deck\
`POST /v1/cards/drawcard` - draw a Deck card\

```json
{
  "deckId": "62823913ba59bb910029f8c6",
  "count": "5"
}
```

## License

[MIT](LICENSE)
