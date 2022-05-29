import Player from "../../../src/Player/Player.js";
import Round from "../../../src/Round/Round.js";
import Deck from "@virtuoid/deck";

describe('getPlayer', () => {
	let round;
	const players = [ new Player({ id: 'a' }), new Player({ id: 'b' })];
	beforeEach( () => {
		round = new Round({
			roundNumber: 1,
			players,
			deck: new Deck()});
	});
	it('should retrieve a player based upon id', () => {
		const player = round.getPlayer({ id: 'a' });
		expect(player).to.equal(players[0]);
	});
	it('should return null if player was not found', () => {
		const player = round.getPlayer({ id: 'bad' });
		expect(player).to.be.null;
	});
});