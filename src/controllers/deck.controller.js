const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { deckService } = require('../services');

const isValudId = (deckId) => {
  return deckId.match(/^[0-9a-fA-F]{24}$/);
};

const createNewDeck = catchAsync(async (req, res) => {
  const deck = await deckService.createDeck(req.body);
  res.status(httpStatus.CREATED).send(deck);
});

const openADeck = catchAsync(async (req, res) => {
  if (!isValudId(req.params.deckId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'must be a valid mongo id');
  }
  const deck = await deckService.getDeckById(req.params.deckId);
  if (!deck) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Deck not found');
  }
  res.send(deck);
});

const drawACard = catchAsync(async (req, res) => {
  if (!isValudId(req.body.deckId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'must be a valid mongo id');
  }
  const deckCards = await deckService.removeDeckCardsByDeckId(req.body.deckId, req.body.count);
  if (!deckCards) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Deck not found');
  }
  res.send(deckCards);
});

module.exports = {
  createNewDeck,
  openADeck,
  drawACard,
};
