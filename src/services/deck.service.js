const httpStatus = require('http-status');
const { Deck } = require('../models');
const ApiError = require('../utils/ApiError');

const ShuffleDeck = (deck) => {
  // for 1000 turns
  // switch the values of two random cards
  for (let i = 0; i < 1000; i += 1) {
    const location1 = Math.floor(Math.random() * deck.length);
    const location2 = Math.floor(Math.random() * deck.length);
    const tmp = deck[location1];

    // eslint-disable-next-line no-param-reassign
    deck[location1] = deck[location2];
    // eslint-disable-next-line no-param-reassign
    deck[location2] = tmp;
  }
  return deck;
};
const CreateFreshDeck = (type, isShuffled) => {
  const suits = ['SPADES', 'DIAMONDS', 'CLUBS', 'HEARTS'];
  let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  if (type === 'SHORT') values = values.slice(0, 9);
  let deck = [];

  for (let i = 0; i < suits.length; i += 1) {
    for (let x = 0; x < values.length; x += 1) {
      const code = values[x] + suits[i].split('')[0].toUpperCase();

      const card = { value: values[x], suit: suits[i], code };
      deck.push(card);
    }
  }
  if (isShuffled) deck = ShuffleDeck(deck);
  return deck;
};

/**
 * Create a deck
 * @param {Object} reqBody
 * @returns {Promise<Deck>}
 */
const createDeck = async (reqBody) => {
  try {
    const deck = reqBody;
    deck.cards = CreateFreshDeck(reqBody.type, reqBody.shuffled);

    let result = await Deck.create(deck);
    result = result.toObject();
    const deckResponse = {};
    deckResponse.deckId = result._id;
    deckResponse.type = result.type;
    deckResponse.shuffled = result.shuffled;
    deckResponse.remaining = result.cards.length;
    return deckResponse;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Error while creating deck');
  }
};

/**
 * Get deck by id
 * @param {ObjectId} id
 * @returns {Promise<Deck>}
 */
const getDeckById = async (id) => {
  try {
    let deck = await Deck.findOne({ _id: id }).select('-createdAt -updatedAt -__v -cards._id');
    deck = deck.toObject();
    deck.remaining = deck.cards.length;
    const { _id, createdAt, updatedAt, __v, ...deckInfo } = deck;
    return deckInfo;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Error while finding deck');
  }
};

/**
 * Remove deck cards by deck id
 * @param {ObjectId} id
 * @param {ObjectId} count
 * @returns {Promise<Deck>}
 */
const removeDeckCardsByDeckId = async (id, count) => {
  const deck = await Deck.findOne({ _id: id }, '-cards._id');
  if (!deck) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Deck not found');
  }
  const popedCards = deck.cards.splice(0, count);
  await deck.save();
  return { cards: popedCards };
};

module.exports = {
  createDeck,
  getDeckById,
  removeDeckCardsByDeckId,
};
