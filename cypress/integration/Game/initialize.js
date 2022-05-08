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

});
