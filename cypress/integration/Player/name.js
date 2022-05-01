import Player from './../../../src/Player/Player.js';

describe('player name', () => {
	it('should assign a default name to the player', () => {
		const player = new Player();
		expect(typeof(player.name)).to.equal('string');
	});
	it('should assign a name to the player', () => {
		const player = new Player({ name: 'name' });
		expect(player.name).to.equal('name');
	});
	it('should not be able to change the name', () => {
		const player = new Player();
		try {
			player.name = 'bad';
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypError');
		}
	});
});