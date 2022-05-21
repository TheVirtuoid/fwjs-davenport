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

	xit('should lock cards for all players', () => {
		cy.wrap(round)
				.then(round.lockCards)
				.then(() => {
					expect(playerA.lockedCard).to.not.be.null;
					expect(playerB.lockedCard).to.not.be.null;
				});
	});

	xit('should FAIL to get a lock because player is human', () => {
		({ deck, players, roundNumber, dealer, round } = initializeTest([
			{ id: 'a', human: true },
			{ id: 'b', human: false }
		]));
		playerA = round.getPlayer({ id: 'a' });
		function promiseTest(round) {
			return new Promise((resolve, reject) => {
				round.lockCards(round)
						.then((round) => {
							resolve('');
						})
						.catch((err) => {
							resolve(err.name);
						})
			});
		}
		cy.wrap(round)
				.then(promiseTest)
				.then((result) => {
					expect(result).to.equal('Error');
				});
	})
});