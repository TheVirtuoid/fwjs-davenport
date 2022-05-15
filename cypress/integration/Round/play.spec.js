/*
		A sample rond of Play

		1. Each player locks a card
		2. Cards are revealed
		3. Winners are determined
				3a. Game ends if one or more winners have zero cards
		4. Non-winners draw cards (ensuring that cards are always available)
		5. Repeat until overall winner

		const playRound = async (round) => {
			lockCards(round)
				.then(getWinners)
				.then(replaceCards)
				.then(advanceDealer)
				.catch(playerNotResponding)
		}
 */



import Player from './../../../src/Player/Player';
import { initializeTest } from '../../fixtures/standardDeck';

describe('play a round', () => {
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

	it('should play complete round with no overall winner', () => {
		round.lockCards(round)
				.then(round.getWinners)
				.then(round.replaceCards)
				.then(round.advanceDealer)
				.then((round) => {
					expect(round.gameOver).to.be.null;
				});
	});
	it('should play complete round with an overall winner', () => {
		// remove all PlayerA cards except for the 10
		for(let i = 1; i <= 4; i++) {
			playerA.deck.remove();
		}
		round.lockCards(round)
				.then(round.getWinners)
				.then(round.replaceCards)
				.then(round.advanceDealer)
				.then((round) => {
					expect(round.gameOver instanceof Player).to.be.true;
					expect(round.gameOver.id).to.equal('a');
				});
	});
	it('should error out because a player cannot lock a card', () => {
		({ deck, players, roundNumber, dealer, round } = initializeTest([
			{ id: 'a', human: true },
			{ id: 'b', human: false }
		]));
		playerA = round.getPlayer({ id: 'a' });
		round.lockCards(round)
				.then(round.getWinners)
				.then(round.replaceCards)
				.then(round.advanceDealer)
				.then(() => {
					expect(true).to.be.false;
				})
				.catch((err) => {
					expect(err.name).to.equal('Error');
				});
	});
});

