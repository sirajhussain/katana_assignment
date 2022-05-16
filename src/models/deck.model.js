const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  value: {
    type: String,
    trim: true,
  },
  suit: {
    type: String,
    trim: true,
  },
  code: {
    type: String,
    trim: true,
  },
});

const deckSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['FULL', 'SHORT'],
      default: 'FULL',
    },
    shuffled: {
      type: Boolean,
      default: false,
    },
    cards: {
      type: [cardSchema],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Deck
 */
const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;
