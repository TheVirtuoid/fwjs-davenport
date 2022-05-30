import Player from "../../../src/classes/Player/Player.js";


describe('human property', () => {
	it('should create the human property', () => {
		const player = new Player();
		expect(typeof(player.human)).to.equal('boolean');
	});
	if('shold create the default value of false', () => {
		const player = new Player();
		expect(player.human).to.be.false;
	});
	it('should return the correct human value passed in argument', () => {
		const player = new Player({ human: true });
		expect(player.human).to.be.true;
	});
	it('should NOT be able to change the human property', () => {
		const player = new Player();
		try {
			player.human = 'bad';
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});