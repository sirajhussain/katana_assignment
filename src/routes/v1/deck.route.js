const express = require('express');
const deckController = require('../../controllers/deck.controller');

const router = express.Router();

router.route('/createdeck').post(deckController.createNewDeck);
router.route('/opendeck/:deckId').get(deckController.openADeck);
router.route('/drawcard/').post(deckController.drawACard);

module.exports = router;
