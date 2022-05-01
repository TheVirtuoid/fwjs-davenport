import Game from './../../../src/Game/Game.js';
import Player from './../../../src/Player/Player.js';
import Deck from "@virtuoid/deck";
import {copyDeck, standardCardDeck, valueMapping} from "../../fixtures/standardDeck";
import {roundEventNames} from "../../fixtures/roundEventData";
const players = [ new Player(), new Player() ];

describe('ending the game', () => {
	it('should not end the game until the round process signals that there is a winner', () => {
		// TODO: May have to design a little more of the code before we can create the test?
		/*
				We expect the game to start, the round to start, a round to end, then another round to start
				before we get to the game end signal.
		 */
/*
		let gameStart = false;
		let roundStart = 0;
		let roundEnd = false;
		let gameEnd = false;

		const game = new Game(players);
		cy.stub(game, 'roundEvent', (roundData) => {
			if (roundData.name === roundEventNames.GAME_START) {
				gameStart = true;
			}
			if (roundData.name === roundEventNames.ROUND_START) {
				roundStart++;
				if (roundStart > 1) {
					expect(gameEnd).to.be.false;
				}
			}
			if (roundData.name === roundEventNames.ROUND_END) {
				roundEnd = true;
			}
			if (roundData.name === roundEventNames.GAME_END) {
				gameEnd = true;
			}
		});
		game.start();
*/
	});
	it('should announce the winner', () => {
		// TODO: Not sure how to test for asynchronous code
	});
	it('should clean up and exit', () => {
		// TODO: Not sure how to test for asynchronous code
	});
});