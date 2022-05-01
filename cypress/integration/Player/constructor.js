import Player from './../../../src/Player/Player.js';

describe('player creation', () => {
	it('should create a player', () => {
		const player = new Player();
		expect(player instanceof Player).to.be.true;
	});
});