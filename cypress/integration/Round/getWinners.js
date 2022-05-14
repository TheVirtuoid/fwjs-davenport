import {initializeTest} from "../../fixtures/standardDeck";

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

	it('should get the winner PlayerA', () => {
		round.lockCards(round)
				.then(round.getWinners(round))
				.then((round) => {
					expect(round.winners instanceof Array).to.be.true;
					expect(round.winners.length).to.equal(1);
					expect(round.winners[0].id).to.equal('a');
				});
	});

	it('should get a tie', () => {
		// we need to deal more cards to make sure they select the same value card;
		// we use a throwaway deck in order that PlayerB can get a 10
		const throwAwayDeck = new Deck();
		for (let i = 1; i <= 12; i++) {
			deck.deal(throwAwayDeck);
		}
		deck.deal(playerB.deck);		 // this will deal a 10d to PlayerB
		round.lockCards(round)
				.then(round.getWinners(round))
				.then((round) => {
					expect(round.winners.length).to.equal(2);
				});
	});
});