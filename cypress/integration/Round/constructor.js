// new Round({ roundNumber, players })

import Round from "../../../src/Round/Round";
import Player from "../../../src/Player/Player";

describe('round constructor', () => {
	it('should create a new round', () => {
		const round = new Round({ roundNumber: 1, players: [ new Player() ]});
		expect(round instanceof Round).to.be.true;
	});
	it('should throw exception if roundNumber is not present', () => {
		try {
			const round = new Round({ players: [ new Player() ]});
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if players are not present', () => {
		try {
			const round = new Round({ roundNumber: 1 });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if players is not an array', () => {
		try {
			const round = new Round({ players: 1 });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if players is not array of Players', () => {
		try {
			const round = new Round({ players: [1, 2, 3, 4] });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});