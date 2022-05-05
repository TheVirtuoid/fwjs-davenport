const roundNumber = 1;
const players = [ new Player(), new Player() ];

describe('players', () => {
	it('should throw exception if trying to change', () => {
		const round = new Round({ roundNumber, players });
		try {
			round.players = 'bad';
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if players is not an array', () => {
		try {
			const round = new Round({ roundNumber, players: 'bad' });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if players is not an array of Player', () => {
		try {
			const round = new Round({ roundNumber, players: [1, 2, 3, 4] });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});