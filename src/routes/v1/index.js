const express = require('express');
const deckRoute = require('./deck.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/cards',
    route: deckRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
