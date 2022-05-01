import Game from "../../../src/Game/Game";
import Player from "../../../src/Player/Player";

describe('play a round', () => {

	let game, round;

	beforeEach( () => {
		game = new Game({ players: [ new Player(), new Player(), new Player() ]});
		game.initialize();
		cy.stub(game, 'start', () => {

		});
		game.start();
	});
	it('should get a cardlock for each player', () => {

	});
});