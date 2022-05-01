import Game from './../../../src/Game/Game.js';

describe('game constructor', () => {
	it('should create the game instance', () => {
		const game = new Game();
		expect(game instanceof Game).to.be.true;
	});
});