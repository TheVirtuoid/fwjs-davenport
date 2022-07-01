import Player from "../../../src/classes/Player/Player.js";

describe('id property', () => {
	it('should create the id property', () => {
		const player = new Player();
		expect(typeof(player.id)).to.equal('string');
	});
	it('should return the correct id value passed in argument', () => {
		const player = new Player({ id: 'a' });
		expect(player.id).to.equal('a');
	});
	it('should NOT be able to change the id property', () => {
		const player = new Player();
		try {
			player.id = 'bad';
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});