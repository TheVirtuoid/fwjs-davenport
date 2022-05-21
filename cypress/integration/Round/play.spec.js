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
				.then(checkForGameOver)
				.catch(playerNotResponding)
		}
 */



import Player from './../../../src/Player/Player';
import { initializeTest } from '../../fixtures/standardDeck';
import {StandardCard, StandardCardRanks, StandardCardSuits} from "@virtuoid/standard-card";

describe('play a round', () => {
	let round;
	let roundNumber;
	let dealer;
	let players;
	let deck;
	let playerA;
	let playerB;

	const returnRound = () => {
		return Promise.resolve(round);
	}

	beforeEach( () => {
		({ deck, players, roundNumber, dealer, round } = initializeTest([
			{ id: 'a', human: false },
			{ id: 'b', human: false }
		]));
		playerA = round.getPlayer({ id: 'a' });
		playerB = round.getPlayer({ id: 'b' });
	});

	it('should play a complete round with no overall winner', () => {
		cy.wrap(round)
				.then(round.play.bind(round))
				.then((round) => {
					expect(round.gameOver).to.be.null;
					expect(round.error).to.be.null;
					expect(round.winners instanceof Array).to.be.true;
					expect(round.winners.length).to.equal(1);
					expect(round.winners[0]).to.equal(playerA);
				});
	});
	it('should play a complete round with an overall winner', () => {
		// remove all PlayerA cards except for the 10
		for(let i = 1; i <= 4; i++) {
			playerA.deck.remove();
		}
		cy.wrap(round)
				.then(round.play.bind(round))
				.then((round) => {
					expect(round.gameOver).to.equal(playerA);
					expect(round.error).to.be.null;
				});
	});
	it('should play a complete round with a tie for the winners', () => {
		// give playerB a high card that matches playerA high card
		playerB.deck.add(new StandardCard({ suit: StandardCardSuits.HEART, rank: StandardCardRanks.TEN, value: 10 }));
		cy.wrap(round)
				.then(round.play.bind(round))
				.then((round) => {
					expect(round.gameOver).to.be.null;
					expect(round.winners.length).to.equal(2);
				});
	});
	it('should error out because a player did not lock a card', () => {
		({ deck, players, roundNumber, dealer, round } = initializeTest([
			{ id: 'a', human: true },
			{ id: 'b', human: false }
		]));
		playerA = round.getPlayer({ id: 'a' });
		cy.wrap(round)
				.then(round.play.bind(round))
				.then((round) => {
					expect(round.gameOver).to.be.null;
					expect(round.error.exception.name).to.equal('Error');
					expect(round.error.player).to.equal(playerA);
				});
	});
});

