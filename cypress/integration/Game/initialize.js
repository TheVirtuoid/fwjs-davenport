import Game from './../../../src/Game/Game.js';
import Player from './../../../src/Player/Player.js';
import Deck from "@virtuoid/deck";
import {copyDeck, standardCardDeck, valueMapping} from "../../fixtures/standardDeck";

const players = [ new Player(), new Player() ];

describe('initialize the game', () => {
	it('should create a standard deck of 52 cards', () => {
		const deck = new Deck({ cards: standardCardDeck });
		const game = new Game({ players });
		game.deck.forEach((card) => deck.remove(card));
		expect(deck.cardCount).to.equal(0);
	});
	it('should assign the correct point values to the cards', () => {
		const game = new Game({ players });
		const allCardsCorrect = game.deck.every((card) => card.value === valueMapping.get(card.rank));
		expect(allCardsCorrect).to.be.true;
	});
	it('should put together a collection of players', () => {
		const game = new Game({ players });
		expect(game.players.length).to.equal(2);
	});
	it('number of players should not be less than 2', () => {
		const players = [ new Player() ];
		try {
			const game = new Game({ players });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('RangeError');
		}
	});
	it('number of players should not be more than 4', () => {
		const players = [ new Player(), new Player(), new Player(), new Player(),
			new Player(), new Player(), new Player(), new Player() ];
		try {
			const game = new Game({ players });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('RangeError');
		}
	});
	it('should specify a starting dealer', () => {
		const game = new Game({ players });
		expect([0, 1].include(game.dealer)).to.be.true;
	});
	xit('should deal 5 cards to each player, beginning with player immediately above the index of the dealer, and rotate through the players to where the dealer is last', () => {
		const players = [ new Player(), new Player(), new Player(), new Player() ];
		const game = new Game({ players });
		const copyOfDeck = copyDeck(game.deck);
		const dealer = game.dealer;
		game.deal();
		const player1Cards = [ copyOfDeck[0], copyOfDeck[4], copyOfDeck[8], copyOfDeck[12], copyOfDeck[16] ];
		const player2Cards = [ copyOfDeck[1], copyOfDeck[5], copyOfDeck[9], copyOfDeck[13], copyOfDeck[17] ];
		const player3Cards = [ copyOfDeck[2], copyOfDeck[6], copyOfDeck[10], copyOfDeck[14], copyOfDeck[18] ];
		const player4Cards = [ copyOfDeck[3], copyOfDeck[7], copyOfDeck[11], copyOfDeck[15], copyOfDeck[19] ];

		const firstPlayer = dealer + 1 === players.length ? 0 : dealer + 1;
		const secondPlayer = firstPlayer + 1 === players.length ? 0 : firstPlayer + 1;
		const thirdPlayer = secondPlayer + 1 === players.length ? 0 : secondPlayer + 1;
		const fourthPlayer = dealer;

		expect(firstPlayer.deck.cards.every((card, index) => card.is(player1Cards[index]))).to.be.true;
		expect(secondPlayer.deck.cards.every((card, index) => card.is(player2Cards[index]))).to.be.true;
		expect(thirdPlayer.deck.cards.every((card, index) => card.is(player3Cards[index]))).to.be.true;
		expect(fourthPlayer.deck.cards.every((card, index) => card.is(player4Cards[index]))).to.be.true;
	});
});
