import {initializeTest} from "../../fixtures/standardDeck";
import Player from "../../../src/Player/Player";

describe('advance the dealer', () => {
	let round;
	let roundNumber;
	let dealer;
	let players;
	let deck;
	let playerA;
	let playerB;

	beforeEach( () => {
		({ deck, players, roundNumber, dealer, round } = initializeTest([
			{ id: 'a', human: false },
			{ id: 'b', human: false }
		]));
		playerA = round.getPlayer({ id: 'a' });
		playerB = round.getPlayer({ id: 'b' });
	});

	it('should advance the dealer', () => {
		cy.wrap(round)
				.then(round.lockCards)
				.then(round.getWinners)
				.then(round.replaceCards)
				.then(round.checkForGameOver)
				.then((round) => {
					expect(round.nextDealer instanceof Player).to.be.true;
					expect(round.nextDealer.id).to.equal(playerB.id);
				});
	});
	it('should set dealer to null if game is over', () => {
		// remove all PlayerA cards except for the 10
		for(let i = 1; i <= 4; i++) {
			playerA.deck.remove();
		}
		cy.wrap(round)
				.then(round.lockCards)
				.then(round.getWinners)
				.then(round.replaceCards)
				.then(round.checkForGameOver)
				.then((round) => {
					expect(round.nextDealer).to.be.null;
				});
	});
});