import Game from './../../../src/Game/Game.js';
import Player from './../../../src/Player/Player.js';
import Round from './../../../src/Round/Round.js';
import Deck from "@virtuoid/deck";
import {copyDeck, standardCardDeck, valueMapping} from "../../fixtures/standardDeck";
import { roundEventNames } from "../../fixtures/roundEventData";

const players = [ new Player(), new Player() ];

let round;

beforeEach( () => {
		round = new Round();
		cy.stub(round, 'play', (roundData) => {
		});
});

describe('starting the game', () => {
	it('should set the round number to 1', () => {
		const game = new Game({ players });
		game.start();
		expect(game.currentRound).to.equal(1);
		game.end();
	});
	it('should start the round process', () => {
		const game = new Game(players);
		cy.stub(game, 'roundEvent', (roundData) => {
			expect(roundData.name).to.equal(roundEventNames.GAME_START);
		});
		game.start();
	});
});
