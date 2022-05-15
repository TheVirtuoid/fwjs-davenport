import Round from "../../../src/Round/Round";
import Player from "../../../src/Player/Player";
import Deck from "@virtuoid/deck";

const roundNumber = 1;
const players = [ new Player({ id: 'a' }), new Player({ id: 'b' }) ];
const dealer = players[0];
const deck = new Deck();

describe('roundNumber', () => {
	it('should not be able to change roundNumber', () => {
		const round = new Round({ roundNumber, players, dealer, deck });
		try {
			round.roundNumber = 2;
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});