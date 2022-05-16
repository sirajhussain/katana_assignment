const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { deck, insertDecks } = require('../fixtures/deck.fixture');

setupTestDB();

describe('Deck routes', () => {
  describe('GET /v1/cards/opendeck/:deckId', () => {
    test('should return 200 and the deck object if data is ok', async () => {
      await insertDecks([deck]);

      const res = await request(app).get(`/v1/cards/opendeck/${deck._id}`).send().expect(httpStatus.OK);

      expect(res.body).toHaveProperty('type');
    });

    test('should return 404 error if deck is not found', async () => {
      await insertDecks([deck]);
      await request(app).get(`/v1/cards/opendeck/invalidId`).send().expect(httpStatus.BAD_REQUEST);
    });
  });
});
