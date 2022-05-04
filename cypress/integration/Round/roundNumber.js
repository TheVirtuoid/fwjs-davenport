import Round from "../../../src/Round/Round";
import Player from "../../../src/Player/Player";

const roundNumber = 1;
const players = [ new Player(), new Player() ];

describe('roundNumber', () => {
	it('should not be able to change roundNumber', () => {
		const round = new Round({ roundNumber, players });
		try {
			round.roundNumber = 2;
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('roundNumber should be a number', () => {
		try {
			const round = new Round({ roundNumber: 'bad', players });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});