import Round from "../../../src/classes/Round/Round.js";
import Player from "../../../src/classes/Player/Player.js";
import Deck from "@virtuoid/deck";

const roundNumber = 1;
const players = [ new Player({ id: 'a' }), new Player({ id: 'b' }) ];
const deck = new Deck();
const discardDeck = new Deck();


describe('deck', () => {
	it('should be able to read the deck', () => {
		const round = new Round({ roundNumber, players, deck, discardDeck });
		expect(round.deck instanceof Deck).to.be.true;
	});
	it('should not be able to change deck', () => {
		const round = new Round({ roundNumber, players, deck, discardDeck });
		try {
			round.deck = 'bad';
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});