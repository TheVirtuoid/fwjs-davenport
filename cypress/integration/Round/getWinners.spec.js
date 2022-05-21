import {initializeTest} from "../../fixtures/standardDeck";
import Deck from "@virtuoid/deck";

describe('getting the winners', () => {
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

	xit('should get the winner PlayerA', () => {
		cy.wrap(round)
				.then(round.lockCards)
				.then(round.getWinners)
				.debug()
				.then((round) => {
					expect(round.winners instanceof Array).to.be.true;
					expect(round.winners.length).to.equal(1);
					expect(round.winners[0].id).to.equal('a');
				});
	});

	xit('should get a tie', () => {
		// we need to deal more cards to make sure they select the same value card;
		// we use a throwaway deck in order that PlayerB can get a 10
		const throwAwayDeck = new Deck();
		for (let i = 1; i <= 12; i++) {
			deck.deal(throwAwayDeck);
		}
		deck.deal(playerB.deck);		 // this will deal a 10d to PlayerB
		cy.wrap(round)
				.then(round.lockCards)
				.then(round.getWinners)
				.debug()
				.then((round) => {
					expect(round.winners.length).to.equal(2);
				});
	});
});