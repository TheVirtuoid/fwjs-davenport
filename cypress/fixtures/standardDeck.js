import { StandardCardSuits, StandardCardRanks, StandardCard } from "@virtuoid/standard-card";
import Deck from "@virtuoid/deck";
import Player from "../../src/classes/Player/Player.js";
import Round from "../../src/classes/Round/Round.js";

const valueMapping = new Map();
valueMapping.set(StandardCardRanks.ACE, 1);
valueMapping.set(StandardCardRanks.TWO, 2);
valueMapping.set(StandardCardRanks.THREE, 3);
valueMapping.set(StandardCardRanks.FOUR, 4);
valueMapping.set(StandardCardRanks.FIVE, 5);
valueMapping.set(StandardCardRanks.SIX, 6);
valueMapping.set(StandardCardRanks.SEVEN, 7);
valueMapping.set(StandardCardRanks.EIGHT, 8);
valueMapping.set(StandardCardRanks.NINE, 9);
valueMapping.set(StandardCardRanks.TEN, 10);
valueMapping.set(StandardCardRanks.JACK, 11);
valueMapping.set(StandardCardRanks.QUEEN, 12);
valueMapping.set(StandardCardRanks.KING, 13);

const standardCardDeck = [];
const standardCardDeckCopy = [];
StandardCardSuits.LIST.forEach((suit) => {
	StandardCardRanks.LIST.forEach((rank) => {
		standardCardDeck.push(new StandardCard({ suit, rank, value: valueMapping.get(rank) }));
		standardCardDeckCopy.push(new StandardCard({ suit, rank, value: valueMapping.get(rank) }));
	});
});

const copyDeck = (cards) => {
	return cards.map((card) => {
		return new StandardCard({ suit: card.suit, rank: card.rank, value: card.value });
	});
};

const dealCards = (deck, round, players) => {
	// dealer is the first player, so move them to the back of the line;
	players.push(players.shift());
	for(let i = 0; i < 5; i++) {
		players.forEach((player) => {
			deck.deal(player.deck);
		})
	}
}

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

const initializeTest = (playerIds, callbacks = {}) => {
	const deck = new Deck({ cards: copyDeck(standardCardDeck)});
	const discardDeck = new Deck();
	const players = playerIds.map((args) => {
		const { id, human = false } = args;
		return new Player({ id, human });
	});
	const roundNumber = 1;
	const round = new Round({ roundNumber, players, deck, discardDeck, callbacks });
	round.testing = {
		makePlayerHuman: false,
		getTieGame: false
	};
	dealCards(deck, round, [...players.values()]);
	return { deck, players, roundNumber, round, discardDeck };
};

export { standardCardDeck, standardCardDeckCopy, valueMapping, copyDeck, dealCards, initializeTest };