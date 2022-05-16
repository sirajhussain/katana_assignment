const mongoose = require('mongoose');
const Deck = require('../../src/models/deck.model');

const deck = {
  _id: mongoose.Types.ObjectId(),
  type: 'FULL',
  shuffled: true,
};

const insertDecks = async (decks) => {
  await Deck.insertMany(decks.map((d) => ({ ...d })));
};

module.exports = {
  deck,
  insertDecks,
};
