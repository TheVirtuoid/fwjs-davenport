import Round from './../../../src/Round/Round';
import Player from './../../../src/Player/Player';
import {copyDeck, standardCardDeck, standardCardDeckCopy, valueMapping} from './../../fixtures/standardDeck';
import Deck from "@virtuoid/deck";
import {StandardCardRanks, StandardCardSuits} from "@virtuoid/standard-card";

const roundNumber = 1;
const dealer = 0;
let players2 = [ new Player({ id: 'a' }), new Player({ id: 'b' }) ];
let players4 = [ new Player({ id: 'a' }), new Player({ id: 'b' }), new Player({ id: 'c' }), new Player({ id: 'd' }) ];

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

const dealtFiveCards = (round) => {
	const playerCheck = [];
	for(let i = 0; i < round.numPlayers; i++) {
		const cards = [];
		for(let j = 0; j < 5; j++) {
			cards.push(standardCardDeckCopy[i * numPlayers + j * 5]);
		}
		playerCheck.push(cards);
	}
	const roundPlayers = round.numPlayers === 2 ? players2 : players4;

	const finalResult = roundPlayers.every((player, index) => {
		const deck = round.getPlayer({ id: player.id }).deck;
		return player.every((card) => deck.findCard(card) !== -1);
	});

	return finalResult;
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


describe('play a round with 2 players', () => {
	let deck;
	let round;
	beforeEach( () => {
		deck = new Deck({ cards: copyDeck(new Deck({ cards: standardCardDeck})) });
		const players = [ new Player({ id: 'a' }), new Player({ id: 'b' })];
		const round = new Round({ roundNumber, players2, deck, dealer });
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
		const round = new Round({ roundNumber, players4, deck, dealer });
		round.deal();
	});
	it('should deal five cards to the players correctly', () => {
		expect(dealtFiveCards(round)).to.be.true;
	});
	it('should wait for all the players to cardlock', () => {});
	it('should time-out if a player is not ready', () => {});
	it('should reveal the cards and determine a single winner', () => {});
	it('should reveal the cards and determine multiple winners', () => {});
	it('should instruct non-winning players to pickup cards, in order from winner', () => {});
	it('should signal the game that there is a winner', () => {});
});