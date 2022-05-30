// const round = new Round({ roundNumber, players, deck });
// all are required

/*
		A sample rond of Play

		1. Each player locks a card
		2. Cards are revealed
		3. Winners are determined
			3a. Single winner, continue on
			3b. Two or more winners, there is no round winner
		4. Non-winners draw cards (ensuring that cards are always available)
		5. Game ends when a player has zero cards left
		6. Repeat until overall winner

		const playRound = async (round) => {
			lockCards(round)
				.then(getWinners)
				.then(replaceCards)
				.then(checkForGameOver)
				.catch(playerNotResponding)
		}
 */

import Round from "../../../src/classes/Round/Round.js";
import Player from "../../../src/classes/Player/Player.js";
import Deck from "@virtuoid/deck";

const playerA = new Player({ id: 'a' });
const playerB = new Player({ id: 'b' });
const players = [ playerA, playerB ];
const roundNumber = 1;
const deck = new Deck();

describe('round constructor', () => {
	it('should create a round instance', () => {
		const round = new Round({ roundNumber, players, deck });
		expect(round instanceof Round).to.be.true;
	});
	it('should throw exception if roundNumber missing', () => {
		try {
			new Round({ players, deck });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if players missing', () => {
		try {
			new Round({ roundNumber, deck });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if deck missing', () => {
		try {
			new Round({ players, roundNumber });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if roundNumber not numeric', () => {
		try {
			new Round({ players, deck, roundNumber: 'a' });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if roundNumber <= 0', () => {
		try {
			new Round({ players, deck, roundNumber: -1 });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('RangeError');
		}
	});
	it('should throw exception if players is not an array', () => {
		try {
			new Round({ roundNumber, players: 'a', deck });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if players is not an array of Player', () => {
		try {
			new Round({ roundNumber, players: [1, 2], deck });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if deck is not instanceof Deck', () => {
		try {
			new Round({ roundNumber, players, deck: 'a' });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});