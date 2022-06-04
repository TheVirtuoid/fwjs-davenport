import {initializeTest, valueMapping} from '../../fixtures/standardDeck.js';
import {StandardCard, StandardCardRanks, StandardCardSuits} from "@virtuoid/standard-card";

describe('play a round', () => {
	let round;
	let roundNumber;
	let players;
	let deck;
	let playerA;
	let playerB;
	let playerC;
	let playerD;
	let discardDeck;

	beforeEach( () => {
		({ deck, players, roundNumber, round, discardDeck } = initializeTest([
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
		({ deck, players, roundNumber, round, discardDeck } = initializeTest([
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
	it('should still be able to deal cards if the deck needs reshuffling', () => {
		// for this test, we will go with 4 players.
		({ deck, players, roundNumber, round, discardDeck } = initializeTest([
			{ id: 'a', human: false },
			{ id: 'b', human: false },
			{ id: 'c', human: false },
			{ id: 'd', human: false }
		]));
		playerA = round.getPlayer({ id: 'a' });
		playerB = round.getPlayer({ id: 'b' });
		playerC = round.getPlayer({ id: 'c' });
		playerD = round.getPlayer({ id: 'd' });
		// remove all the cards from the deck except for 1
		while(round.deck.cardCount > 1) {
			round.deck.remove();
		}
		// The cards that will be played in the first round are as follows:
		// 		PlayerA:	qc
		//		PlayerB:	kc
		//		PlayerC:	10c
		//		PlayerD:	jc
		// PlayerB will be the winner. All four locked cards will go to a discard deck (which starts out empty).
		// As there will only be one card left in the deck to be drawn, PlayerC will draw that card (which will be
		// King of Spades - ks), the discard deck (4 cards in size) will then be shuffled and made into the
		// regular deck. The last two players draw from that deck, leaving the regular deck with 2 cards
		//
		const pickedUpCard = new StandardCard({ suit: StandardCardSuits.SPADE, rank: StandardCardRanks.KING, value: valueMapping.get(StandardCardRanks.KING)});
		cy.wrap(round)
				.then(round.play.bind(round))
				.then((round) => {
					expect(round.gameOver).to.be.false;
					expect(playerC.deck.findCard(pickedUpCard)).to.not.equal(-1);
					expect(round.deck.cardCount).to.equal(2);
				});
	});
	function printCards(cards) {
		const output = cards.map((card) => card.toString());
		return output.join(',');
	}
});

