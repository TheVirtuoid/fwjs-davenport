import Player from "../../../src/classes/Player/Player.js";


describe('player constructor', () => {
	it('should construct a player', () => {
		const player = new Player();
		expect(player instanceof Player).to.be.true;
	});
});