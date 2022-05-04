import Round from "../../../src/Round/Round.js";
import Player from "../../../src/Player/Player";

const players = [ new Player(), new Player() ];
const roundNumber = 1;

describe('round constructor', () => {
	it('must return a round', () => {
		const round = new Round({ roundNumber, players });
		expect(round instanceof Round).to.be.true;
	});
	it('should return a round number if specified', () => {
		const round = new Round({ roundNumber, players });
		expect(round.roundNumber).to.equal(1);
	});
	it('should throw an exception if roundNumber is not present', () => {
		try {
			const round = new Round({ players });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('Error');
		}
	});
	it('should have a players parameter', () => {
		const round = new Round({ roundNumber, players });
		expect(round.players instanceof Array).to.be.true;
		expect(round.players.length).to.equal(players.length);
	});
	it('should throw exception if players is not present', () => {
		try {
			const round = new Round({ roundNumber });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('Error');
		}
	});
});