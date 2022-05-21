/*
	Initialize does the following:

		1 A new deck is initialized (passing the starting dealer)
		2. Players are dealt starting hand

 */
import Player from "../../../src/Player/Player";
import Game from "../../../src/Game/Game";
import {StandardCard, StandardCardRanks, StandardCardSuits} from "@virtuoid/standard-card";
import {copyDeck, standardCardDeck} from "../../fixtures/standardDeck";

let game;
let playerA;
let playerB;
let players;
let dealer;

const cardsPerPlayer = 5;
const numPlayers = 2;


beforeEach(() => {
	playerA = new Player({ id: 'a' });
	playerB = new Player({ id: 'b' });
	players = [ playerA, playerB ];
	dealer = playerA;
	game = new Game({ players });
});
describe('initialize', () => {
	it('should throw exception if dealer argument is not a Player instance', () => {
		try {
			game.initialize({ dealer: 'bad' });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if dealer is not present in the Players collection', () => {
		try {
			game.initialize({ dealer: new Player({ id: 'bad' }) });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('RangeError');
		}
	});
	it('should create a new deck of 52 standard cards', () => {
		const deck = copyDeck(standardCardDeck);
		let result = true;
		game.initialize({ dealer });
		while(deck.length) {
			const card = deck.pop();
			const inGame = game.deck.findCard(card);
			const inPlayerA = playerA.deck.findCard(card);
			const inPlayerB = playerB.deck.findCard(card);
			result &&= Math.max(inGame, inPlayerA, inPlayerB) >= 0;
		}
		expect(result).to.be.true;
	});
	it('should deal five cards to all players', () => {
		game.initialize({ dealer });
		expect(playerA.deck.cardCount).to.equal(cardsPerPlayer);
		expect(playerB.deck.cardCount).to.equal(cardsPerPlayer);
		expect(game.deck.cardCount).to.equal(copyDeck(standardCardDeck).length - cardsPerPlayer * numPlayers);
	});
});