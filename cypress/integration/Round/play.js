/*
		A sample rond of Play

		1. Each player locks a card
		2. Cards are revealed
		3. Winners are determined
				3a. Game ends if one or more winners have zero cards
		4. Non-winners draw cards (ensuring that cards are always available)
		5. Repeat until overall winner

		JS needed for the above:

		while (!winners) {
			try {
				await playRound(round);
			} catch(err) {
				// player not responding. Game ends
				winners = [-1];
			}
		}

		const playRound = async (round) => {
			lockCards(round)
				.then(revealCards)
				.then(determineWinners)
				.then(drawCards)
				.catch(playerNotResponding)
		}
 */



import Round from './../../../src/Round/Round';
import Player from './../../../src/Player/Player';
import {copyDeck, standardCardDeck, standardCardDeckCopy, valueMapping} from './../../fixtures/standardDeck';
import Deck from "@virtuoid/deck";
import {StandardCardRanks, StandardCardSuits} from "@virtuoid/standard-card";

const roundNumber = 1;
const dealer = 0;

// after the cards are dealt, the cards in order will be:
// 		2 players
//				player0: '2c', '4c', '6c', '8c', '10c'
//				player1: 'ac', '3c', '5c', '7c', '9c'
//		4 players
//				player0: '4c', '8c', 'qc', '3d', '7d'
//				player1: 'ac', '5c', '9c', 'kc', '4d'
//				player2: '2c', '6c', '10c', 'ad', '5d'
//				player3: '3c', '7c', 'jc', '2d', '6d'
//
//		Dealer is 0 index player (player0)
//

const dealCards = (deck, round) => {
	const player0 = round.getPlayer({ id: 'a' });
	const player1 = round.getPlayer({ id: 'b' });
	const player2 = round.getPlayer({ id: 'c' });
	const player3 = round.getPlayer({ id: 'd' });
	for(let i = 0; i < 5; i++) {
		deck.deal(player1.deck);
		if (player2) deck.deal(player2.deck);
		if (player3) deck.deal(player3.deck);
		deck.deal(player0.deck);
	}
}

const lockPlayers = (round) => {
	const player0 = round.getPlayer({ id: 'a' });
	const player1 = round.getPlayer({ id: 'b' });
	const player2 = round.getPlayer({ id: 'c' });
	const player3 = round.getPlayer({ id: 'd' });
	player0.lock = player0.remove(0);
	player1.lock = player1.remove(0);
	if (player2) player2.lock = player2.remove(0);
	if (player3) player3.lock = player3.remove(0);

}

const waitForPlayers = async (round) => {
	lockPlayers(round);
	return await round.waitForAllLocks();
}

// player0 does not lock
const waitForPlayersFail = async (round) => {
	lockPlayers(round);
	round.getPlayer({ id: 'a' }).lock = null;
	return await round.waitForAllLocks();
}

// the winner should be player0
const determineSingleWinner = async (round) => {
	lockPlayers(round);
	await round.waitForAllLocks();
	return round.determineWinner();
}

// the winner should be player0 and player1, or player0 and player3
// in 2 player test, we need to deal addition cards to get a tie
const determineMultipleWinner = async (round) => {
	const player0 = round.getPlayer({ id: 'a' });
	const player1 = round.getPlayer({ id: 'b' });
	const player2 = round.getPlayer({ id: 'c' });
	const player3 = round.getPlayer({ id: 'd' });
	if (round.numPlayers === 2) {
		round.deck.deal(player1.deck);		// jc
		round.deck.deal(player0.deck);		// qc
		round.deck.deal(player1.deck);		// kc
		round.deck.deal(player0.deck);		// ad
		player0.lock = player0.deck.remove(6);
		player1.lock = player1.deck.remove(0);
	} else {
		player0.lock = player0.deck.remove(3);
		player1.lock = player1.remove(0);
		player2.lock = player2.remove(0);
		player3.lock = player3.remove(0);
	}
	await round.waitForAllLocks();
	return round.determineWinner();
}

const pickUpCardsSingleWinner = async (round) => {
	lockPlayers(round);
	await round.waitForAllLocks();
	const winner = round.determineSingleWinner();
	round.pickUpCards(winner);
}

const pickUpCardsMultipleWinner = async (round) => {
	lockPlayers(round);
	await round.waitForAllLocks();
	const winner = round.determineMultipleWinner();
	round.pickUpCards(winner);
}

const pickUpCardsSingleWinner = async (round) => {
	lockPlayers(round);
	await round.waitForAllLocks();
	const winner = round.determineSingleWinner();
	round.pickUpCards(winner);
}

const determineNextDealer = async (round) => {
	await pickUpCardsSingleWinner(round);
	return round.determineNextDealer();
}

const winGame = async (round) => {
	const player0 = round.getPlayer({ id: 'a' });
	const player1 = round.getPlayer({ id: 'b' });
	const player2 = round.getPlayer({ id: 'c' });
	const player3 = round.getPlayer({ id: 'd' });
	for(let x = 1; x <= 4; x++) {
		player0.deck.remove(x);
		player1.deck.remove(x);
		player2?.deck.remove(x);
		player3?.deck.remove(x);
	}
	lockPlayers(round);
	await round.waitForAllLocks();
	const winner = round.determineSingleWinner();
	round.pickUpCards(winner);
	return round.determineNextDealer();
}

const beforeEach = (playerIds) => {
	const deck = new Deck({ cards: copyDeck(standardCardDeck)});
	const players = playerIds.map((id) => new Player({ id }));
	const roundNumber = 1;
	const dealer = 0;
	const round = new Round({ roundNumber, players, deck, dealer });
	dealCards(deck, round);
	return { deck, players, roundNumber, dealer, round };
};


describe('play a round with 2 players', () => {
	const { deck, players, roundNumber, dealer, round } = beforeEach(['a', 'b']);
	it('should wait for a cardlock for all players', () => {
		round.waitForCardLock(round)
				.then((round) => {
					expect(round.getPlayer({ id: 'a' }).cardLock instanceof Card).to.be.true;
					expect(round.getPlayer({ id: 'b' }).cardLock instanceof Card).to.be.true;
				})
				.catch((err) => {
					expect(true).to.be.false;
				})
	});
	it('should throw exception if a player fails to cardlock', () => {
		round.getPlayer({ id: 'a' }).human = true;
		round.waitForCardLock(round)
				.then((round) => {
					expect(true).to.be.false;
					round.getPlayer({ id: 'a' }).human = false;
				})
				.catch((err) => {
					expect(err.name).to.equal('Error');
					round.getPlayer({ id: 'a' }).human = false;
				});
	});
	it('should reveal the cardlock', () => {});
	it('should determine a winner', () => {});
	it('should declare draw when there is a tie for winners', () => {});
	it('should get losing players to pick up cards', () => {});
	it('should get all players to pick up cards if there is a tie for winners', () => {});
	it('should signal that the round is complete', () => {});
	it('should signal that the game is complete', () => {});




	it('should play a full round', () => {
		round.waitForPlayerLock(round)
				.then(round.determineWinner)
				.then(round.pickUpCards)
				.then((round) => {
					expect(round.newDealer).to.equal(1);
				});
	});
	it('should declare no winner in case of a tie', () => {

	});
	it('should wait for all the players to cardlock', () => {
		expect(waitForPlayers(round)).to.be.true;
	});
	it('should time-out if a player is not ready', () => {
		const playerMissing = waitForPlayersFail((round, players));
		expect(playerMissing).to.equal(0);
	});
	it('should reveal the cards and determine a single winner', () => {
		const winningPlayers = determineSingleWinner(round);
		expect(winningPlayers.length).to.equal(1);
		expect(winningPlayers[0]).to.equal(0);
	});
	it('should reveal the cards and determine multiple winners', () => {
		const winningPlayers = determineMultipleWinner(round);
		expect(winningPlayers.length).to.equal(2);
		expect(winningPlayers.find((player) => player.id === 'a')).to.not.be.undefined;
		expect(winningPlayers.find((player) => player.id === 'b')).to.not.be.undefined;
	});
	it('should instruct non-winning players to pickup cards, in order from winner (single)', () => {
		pickUpCardsSingleWinner(round);
		const player0 = round.getPlayer({ id: 'a' });
		const player1 = round.getPlayer({ id: 'b' });
		expect(player0.deck.cardCount).to.equal(4);
		expect(player1.deck.cardCount).to.equal(5);
		expect(player1.deck.findCard(
				new Card({
					suit: StandardCardSuits.CLUB,
					rank: StandardCardRanks.JACK,
					value: valueMapping.get(StandardCardRanks.JACK)
				})
		)).to.not.equal(-1);
	});
	it('should instruct non-winning players to pickup cards, in order from winner (multiple)', () => {
		pickUpCardsMultipleWinner(round);
		const player0 = round.getPlayer({ id: 'a' });
		const player1 = round.getPlayer({ id: 'b' });
		expect(player0.deck.cardCount).to.equal(4);
		expect(player1.deck.cardCount).to.equal(4);
	});
	it('should signal the game that the dealer has changed', () => {
		const nextDealer = determineNextDealer(round);
		expect(nextDealer).to.equal(1);
	});
	it('should signal the game that there is a winner', () => {
		const nextDealer = winGame(round);
		expect(nextDealer).to.equal(-1);
	});
});

describe('play a round with 4 players', () => {
	let deck;
	let round;
	beforeEach( () => {
		deck = new Deck({ cards: copyDeck(new Deck({ cards: standardCardDeck})) });
		const players = [ new Player({ id: 'a' }), new Player({ id: 'b' }), new Player({ id: 'c' }), new Player({ id: 'd' })];
		const round = new Round({ roundNumber, players, deck, dealer });
		round.deal();
	});
	it('should deal five cards to the players correctly', () => {
		expect(dealtFiveCards(round)).to.be.true;
	});
	it('should wait for all the players to cardlock', () => {
		expect(waitForPlayers(round)).to.be.true;
	});
	it('should time-out if a player is not ready', () => {
		const playerMissing = waitForPlayersFail((round, players));
		expect(playerMissing).to.equal(0);
	});
	it('should reveal the cards and determine a single winner', () => {
		const winningPlayers = determineSingleWinner(round);
		expect(winningPlayers.length).to.equal(1);
		expect(winningPlayers[0]).to.equal(0);
	});
	it('should reveal the cards and determine multiple winners', () => {
		const winningPlayers = determineMultipleWinner(round);
		expect(winningPlayers.length).to.equal(2);
		expect(winningPlayers.find((player) => player.id === 'a')).to.not.be.undefined;
		expect(winningPlayers.find((player) => player.id === 'b')).to.not.be.undefined;
	});
	it('should instruct non-winning players to pickup cards, in order from winner (single)', () => {
		pickUpCardsSingleWinner(round);
		const player0 = round.getPlayer({ id: 'a' });
		const player1 = round.getPlayer({ id: 'b' });
		const player2 = round.getPlayer({ id: 'c' });
		const player3 = round.getPlayer({ id: 'd' });
		expect(player0.deck.cardCount).to.equal(4);
		expect(player1.deck.cardCount).to.equal(5);
		expect(player2.deck.cardCount).to.equal(5);
		expect(player3.deck.cardCount).to.equal(5);
		expect(player1.deck.findCard(
				new Card({
					suit: StandardCardSuits.DIAMOND,
					rank: StandardCardRanks.EIGHT,
					value: valueMapping.get(StandardCardRanks.EIGHT)
				})
		)).to.not.equal(-1);
		expect(player1.deck.findCard(
				new Card({
					suit: StandardCardSuits.DIAMOND,
					rank: StandardCardRanks.NINE,
					value: valueMapping.get(StandardCardRanks.NINE)
				})
		)).to.not.equal(-1);
		expect(player1.deck.findCard(
				new Card({
					suit: StandardCardSuits.DIAMOND,
					rank: StandardCardRanks.TEN,
					value: valueMapping.get(StandardCardRanks.TEN)
				})
		)).to.not.equal(-1);
	});
	it('should instruct non-winning players to pickup cards, in order from winner (multiple)', () => {
		pickUpCardsMultipleWinner(round);
		const player0 = round.getPlayer({ id: 'a' });
		const player1 = round.getPlayer({ id: 'b' });
		const player2 = round.getPlayer({ id: 'c' });
		const player3 = round.getPlayer({ id: 'd' });
		expect(player0.deck.cardCount).to.equal(4);
		expect(player1.deck.cardCount).to.equal(4);
		expect(player2.deck.cardCount).to.equal(5);
		expect(player3.deck.cardCount).to.equal(5);
	});
});
