import Round from './../../../src/Round/Round';
import Player from './../../../src/Player/Player';
import { copyDeck } from './../../fixtures/standardDeck';
import Deck from '@virtuoid/deck';

const roundNumber = 1;
const players = [ new Player(), new Player() ];
const deck = new Deck({ cards: copyDeck(new Deck({ cards: standardCardDeck})) });

const dealtFiveCards = (round) => {
	round.deal();
	return false;
}

const waitForPlayers = (round) => {
	return false;
}

const determineWinner = (round) => {
	return false;
}

const pickUpCards = (round) => {
	return false;
}

describe('play a round', () => {
	it('should play a full round', () => {
		const round = new Round({ roundNumber, players, deck });
		expect(dealtFiveCards(round)).to.be.true;
		expect(waitForPlayers(round)).to.be.true;
		expect(determineWinner(round)).to.be.true;
		expect(pickUpCards(round)).to.be.true;
	});
});