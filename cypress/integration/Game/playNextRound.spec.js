import Player from "../../../src/classes/Player/Player.js";
import Game from "../../../src/classes/Game/Game.js";
import {StandardCard, StandardCardRanks, StandardCardSuits} from "@virtuoid/standard-card";

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
	game.initialize({ dealer });
});

describe('play a single round', () => {
	xit('should play a single round', () => {
		/* for this one, we'll force cards into the decks of the players
			 so to control the outcome.

			 playerA = ac, 2c
			 playerB = kc, qc

			 We will also remove all the cards from the game deck and add in
			 two more. That way, two rounds will be played, with PlayerA having the '3c'
			 and '4c' cards, while PlayerB will be the winner with no cards
	 */
		for(let i = 0; i < cardsPerPlayer; i++) {
			playerA.deck.remove();
			playerB.deck.remove();
		}
		playerA.deck.add(new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.ACE, value: 1 }));
		playerB.deck.add(new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.KING, value: 13 }));
		playerA.deck.add(new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.TWO, value: 2 }));
		playerB.deck.add(new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.QUEEN, value: 12 }));
		for(let i = 0; i < 52 - cardsPerPlayer * numPlayers; i++) {
			game.deck.remove();
		}
		game.deck.add(new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.THREE, value: 3 }));
		game.deck.add(new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.FOUR, value: 4 }));
		//
		cy.wrap(null)
				.then(() => game.playNextRound())
				.then(() => {
					expect(game.gameOver).to.be.false;
					expect(game.winner).to.equal(playerB);
					expect(game.error).to.be.null;
				});
	});
	xit('should reject the round because there was no card lock', () => {});
});