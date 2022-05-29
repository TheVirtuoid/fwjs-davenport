import Round from "../../../src/Round/Round.js";
import Player from "../../../src/Player/Player.js";
import Deck from "@virtuoid/deck";

const roundNumber = 1;
const players = [ new Player({ id: 'a' }), new Player({ id: 'b' }) ];
const deck = new Deck();

describe('roundNumber', () => {
	it('should be able to read the roundNumber', () => {
		const round = new Round({ roundNumber, players, deck });
		expect(round.roundNumber).to.equal(1);
	});
	it('should not be able to change roundNumber', () => {
		const round = new Round({ roundNumber, players, deck });
		try {
			round.roundNumber = 2;
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});