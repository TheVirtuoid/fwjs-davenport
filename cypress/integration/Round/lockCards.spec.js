import { initializeTest } from "../../fixtures/standardDeck";

describe('getting a locked card from a player', () => {
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

	it('should lock cards for all players', () => {
		round.lockCards()
				.then(() => {
					expect(playerA.lockedCard).to.not.be.null;
					expect(playerB.lockedCard).to.not.be.null;
				});
	});

	it('should FAIL to get a lock because player is human', () => {
		({ deck, players, roundNumber, dealer, round } = initializeTest([
			{ id: 'a', human: true },
			{ id: 'b', human: false }
		]));
		playerA = round.getPlayer({ id: 'a' });
		round.lockCards(round)
				.then(() => {
					expect(true).to.be.false;
				})
				.catch((err) => {
					expect(err.name).to.equal('Error');
					expect(playerA.lockedCard).to.be.null;
				});
	})
});