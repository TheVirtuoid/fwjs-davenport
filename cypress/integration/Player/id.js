import Player from './../../../src/Player/Player.js';

describe('player id', () => {
	it('should assign an id to the player', () => {
		const player = new Player();
		expect(typeof(player.id)).to.equal('string');
	});
	it('should not be able to change the id', () => {
		const player = new Player();
		try {
			player.id = 'bad';
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypError');
		}
	});
});