import {initializeTest, valueMapping} from '../../fixtures/standardDeck.js';
import {StandardCard, StandardCardRanks, StandardCardSuits} from "@virtuoid/standard-card";
import Round from "../../../src/classes/Round/Round.js";

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
	it('should call all the callback functions correctly and in order', () => {
		let count = 0;
		const roundStart = { in: 1, out: 0, round: null };
		const beforeLockedCards = { in: 2, out: 0, round: null };
		const afterLockedCards = { in: 3, out: 0, round: null };
		const beforeDetermineWinner = { in: 4, out: 0, round: null };
		const afterDetermineWinner = { in: 5, out: 0, round: null };
		const beforeReplaceCards = { in: 6, out: 0, round: null };
		const afterReplaceCards = { in: 7, out: 0, round: null };
		const roundEnd = { in: 8, out: 0, round: null };
		const callbacks = {
			roundStart: (round) => {
				count++;
				roundStart.out = count;
				roundStart.round = round;
				return Promise.resolve(round)
			},
			beforeLockedCards: (round) => {
				count++;
				beforeLockedCards.out = count;
				beforeLockedCards.round = round;
				return Promise.resolve(round);
			},
			afterLockedCards: (round) => {
				count++;
				afterLockedCards.out = count;
				afterLockedCards.round = round;
				return Promise.resolve(round);
			},
			beforeDetermineWinner: (round) => {
				count++;
				beforeDetermineWinner.out = count;
				beforeDetermineWinner.round = round;
				return Promise.resolve(round);
			},
			afterDetermineWinner: (round) => {
				count++;
				afterDetermineWinner.out = count;
				afterDetermineWinner.round = round;
				return Promise.resolve(round);
			},
			beforeReplaceCards: (round) => {
				count++;
				beforeReplaceCards.out = count;
				beforeReplaceCards.round = round;
				return Promise.resolve(round);
			},
			afterReplaceCards: (round) => {
				count++;
				afterReplaceCards.out = count;
				afterReplaceCards.round = round;
				return Promise.resolve(round);
			},
			roundEnd: (round) => {
				count++;
				roundEnd.out = count;
				roundEnd.round = round;
				return Promise.resolve(round);
			}
		};
		({ deck, players, roundNumber, round, discardDeck } = initializeTest([
			{ id: 'a', human: false },
			{ id: 'b', human: false },
		], callbacks));
		cy.wrap(round)
				.then(round.play.bind(round))
				.then((round) => {
					expect(roundStart.out).to.equal(roundStart.in);
					expect(beforeLockedCards.out).to.equal(beforeLockedCards.in);
					expect(afterLockedCards.out).to.equal(afterLockedCards.in);
					expect(beforeDetermineWinner.out).to.equal(beforeDetermineWinner.in);
					expect(afterDetermineWinner.out).to.equal(afterDetermineWinner.in);
					expect(beforeReplaceCards.out).to.equal(beforeReplaceCards.in);
					expect(afterReplaceCards.out).to.equal(afterReplaceCards.in);
					expect(roundEnd.out).to.equal(roundEnd.in);

					expect(roundStart.round instanceof Round).to.be.true;
					expect(beforeLockedCards.round instanceof Round).to.be.true;
					expect(afterLockedCards.round instanceof Round).to.be.true;
					expect(beforeDetermineWinner.round instanceof Round).to.be.true;
					expect(afterDetermineWinner.round instanceof Round).to.be.true;
					expect(beforeReplaceCards.round instanceof Round).to.be.true;
					expect(afterReplaceCards.round instanceof Round).to.be.true;
					expect(roundEnd.round instanceof Round).to.be.true;
				});
	})
});

