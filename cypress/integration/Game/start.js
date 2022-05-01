import Game from './../../../src/Game/Game.js';
import Player from './../../../src/Player/Player.js';
import Deck from "@virtuoid/deck";
import {copyDeck, standardCardDeck, valueMapping} from "../../fixtures/standardDeck";
import { roundEventNames } from "../../fixtures/roundEventData";

const players = [ new Player(), new Player() ];

describe('starting the game', () => {
	it('should set the round number to 1', () => {
		const game = new Game({ players });
		expect(game.currentRound).to.equal(1);
	});
	it('should start the round process', () => {
		/*
				When a round starts, it will send a signal back to the Game specifying that
				it has started. The game will instruct a new Round to begin and get
				an event that it has started.

				We will test the first action to come from the roundEvent as it should be the
				round start event
		 */
		const game = new Game(players);
		cy.stub(game, 'roundEvent', (roundData) => {
			expect(roundData.name).to.equal(roundEventNames.GAME_START);
		});
		game.start();
	});
});
