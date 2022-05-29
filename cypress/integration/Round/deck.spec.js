import Round from "../../../src/Round/Round.js";
import Player from "../../../src/Player/Player.js";
import Deck from "@virtuoid/deck";

const roundNumber = 1;
const players = [ new Player({ id: 'a' }), new Player({ id: 'b' }) ];
const deck = new Deck();

describe('deck', () => {
	it('should be able to read the deck', () => {
		const round = new Round({ roundNumber, players, deck });
		expect(round.deck instanceof Deck).to.be.true;
	});
	it('should not be able to change deck', () => {
		const round = new Round({ roundNumber, players, deck });
		try {
			round.deck = 'bad';
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});