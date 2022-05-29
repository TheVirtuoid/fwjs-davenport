import { initializeTest } from '../../fixtures/standardDeck.js';
import {StandardCard, StandardCardRanks, StandardCardSuits} from "@virtuoid/standard-card";

describe('play a round', () => {
	let round;
	let roundNumber;
	let players;
	let deck;
	let playerA;
	let playerB;

	beforeEach( () => {
		({ deck, players, roundNumber, round } = initializeTest([
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
					expect(round.gameOver).to.be.false;
					expect(round.error).to.be.null;
					expect(round.winners instanceof Array).to.be.true;
					expect(round.winners.length).to.equal(1);
					expect(round.winners[0]).to.equal(playerA);
					expect(playerA.deck.cardCount).to.equal(4);
					expect(playerB.deck.cardCount).to.equal(5);
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
					expect(round.gameOver).to.be.true;
					expect(round.winners.length).to.equal(1);
					expect(round.winners[0]).to.equal(playerA);
					expect(round.error).to.be.null;
					expect(playerA.deck.cardCount).to.equal(0);
				});
	});
	it('should play a complete round with a tie for the winners', () => {
		// give playerB a high card that matches playerA high card
		playerB.deck.add(new StandardCard({ suit: StandardCardSuits.HEART, rank: StandardCardRanks.TEN, value: 10 }));
		cy.wrap(round)
				.then(round.play.bind(round))
				.then((round) => {
					expect(round.gameOver).to.be.false;
					expect(round.winners.length).to.equal(2);
					expect(playerA.deck.cardCount).to.equal(5);
					expect(playerB.deck.cardCount).to.equal(6);
				});
	});
	it('should error out because a player did not lock a card', () => {
		({ deck, players, roundNumber, round } = initializeTest([
			{ id: 'a', human: true },
			{ id: 'b', human: false }
		]));
		playerA = round.getPlayer({ id: 'a' });
		cy.wrap(round)
				.then(round.play.bind(round))
				.then((round) => {
					expect(round.gameOver).to.be.true;
					expect(round.winners.length).to.equal(0);
					expect(round.error.exception.name).to.equal('Error');
					expect(round.error.player).to.equal(playerA);
				});
	});
});

