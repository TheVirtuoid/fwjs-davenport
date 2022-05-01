import Player from './../../../src/Player/Player.js';

describe('player human', () => {
	it('should assign a default human as false', () => {
		const player = new Player();
		expect(player.human).to.be.false;
	});
	it('should assign a human setting', () => {
		const player = new Player({ human: true });
		expect(player.human).to.be.true;
	});
	it('should assign a default AI to the player if not human', () => {
		const player1 = new Player();
		expect(typeof(player1.ai)).to.equal('number');
		const player2 = new Player({ human: false });
		expect(typeof(player2.ai)).to.equal('number');
	});
	it('should not be able to change the human', () => {
		const player = new Player();
		try {
			player.human = true;
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypError');
		}
	});
	it('should not be able to change the ai', () => {
		const player = new Player();
		try {
			player.ai = -1;
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypError');
		}
	});
});