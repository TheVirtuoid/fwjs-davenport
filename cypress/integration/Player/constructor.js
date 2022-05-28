import Player from "../../../src/Player/Player.js";


describe('player constructor', () => {
	it('should construct a player', () => {
		const player = new Player();
		expect(player instanceof Player).to.be.true;
	});
});