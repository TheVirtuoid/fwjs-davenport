import Round from "../../../src/classes/Round/Round.js";
import Player from "../../../src/classes/Player/Player.js";
import Deck from "@virtuoid/deck";

const roundNumber = 1;
const players = [ new Player({ id: 'a' }), new Player({ id: 'b' }) ];
const deck = new Deck();

describe('winners', () => {
	it('should be able to read the winners', () => {
		const round = new Round({ roundNumber, players, deck });
		expect(round.winners instanceof Array).to.be.true;
		expect(round.winners.length).to.equal(0);
	});
	it('should not be able to change the winners', () => {
		const round = new Round({ roundNumber, players, deck });
		try {
			round.winners = 'bad';
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});