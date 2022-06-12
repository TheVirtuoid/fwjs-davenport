import Round from "../../../src/classes/Round/Round.js";
import Player from "../../../src/classes/Player/Player.js";
import Deck from "@virtuoid/deck";

const roundNumber = 1;
const players = [ new Player({ id: 'a' }), new Player({ id: 'b' }) ];
const deck = new Deck();
const discardDeck = new Deck();


describe('gameOver', () => {
	it('should be able to read the gameOver property', () => {
		const round = new Round({ roundNumber, players, deck, discardDeck });
		expect(round.gameOver).to.be.false;
	});
	it('should not be able to change roundNumber', () => {
		const round = new Round({ roundNumber, players, deck, discardDeck });
		try {
			round.gameOver = 'bad';
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});