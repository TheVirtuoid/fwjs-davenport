import {initializeTest} from "../../fixtures/standardDeck";

describe('replace losing cards', () => {
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

	it('should replace card of PlayerB', () => {
		round.lockCards(round)
				.then(getWinners(round))
				.then(replaceCards(round))
				.then((round) => {
					expect(playerA.deck.cardCount).to.equal(4);
					expect(playerB.deck.cardCount).to.equal(5);
				});
	});
	it('should replace ALL cards due to tie', () => {
		// we need to deal more cards to make sure they select the same value card;
		// we use a throwaway deck in order that PlayerB can get a 10
		const throwAwayDeck = new Deck();
		for (let i = 1; i <= 12; i++) {
			deck.deal(throwAwayDeck);
		}
		deck.deal(playerB.deck);		 // this will deal a 10d to PlayerB
		round.lockCards(round)
				.then(getWinners(round))
				.then(replaceCards(round))
				.then((round) => {
					expect(playerA.deck.cardCount).to.equal(5);
					expect(playerB.deck.cardCount).to.equal(5);
				});
	});
});