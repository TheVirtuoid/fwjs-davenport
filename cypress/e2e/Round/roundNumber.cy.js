import Round from "../../../src/classes/Round/Round.js";
import Player from "../../../src/classes/Player/Player.js";
import Deck from "@virtuoid/deck";

const roundNumber = 1;
const players = [ new Player({ id: 'a' }), new Player({ id: 'b' }) ];
const deck = new Deck();
const discardDeck = new Deck();


describe('roundNumber', () => {
	it('should be able to read the roundNumber', () => {
		const round = new Round({ roundNumber, players, deck, discardDeck });
		expect(round.roundNumber).to.equal(1);
	});
	it('should not be able to change roundNumber', () => {
		const round = new Round({ roundNumber, players, deck, discardDeck });
		try {
			round.roundNumber = 2;
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});