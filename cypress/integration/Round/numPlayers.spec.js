import Round from "../../../src/Round/Round.js";
import Player from "../../../src/Player/Player.js";
import Deck from "@virtuoid/deck";

describe('numPlayers', () => {
	let round;
	const players = [ new Player({ id: 'a' }), new Player({ id: 'b' })];
	beforeEach( () => {
		round = new Round({
			roundNumber: 1,
			players,
			deck: new Deck()});
	});
	it('should return the number of players', () => {
		expect(round.numPlayers).to.equal(2);
	});
	it('should throw exception is trying to change numPlayers', () => {
		try {
			round.numPlayers = 5;
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});