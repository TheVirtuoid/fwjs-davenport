// round.getPlayer(options)
// options = key/value pair to compare against. Only
import Round from "../../../src/Round/Round";
import Player from "../../../src/Player/Player";
import Deck from "@virtuoid/deck";

describe('getPlayer', () => {
	const players = [new Player({ id: 'a' }), new Player({ id: 'b' }) ];
	const roundNumber = 1;
	const deck = new Deck();
	const dealer = players[0];
	it('should return the Player instance if the player is found', () => {
		const round = new Round({ roundNumber, players, dealer, deck });
		const player = round.getPlayer({ id: 'a' });
		expect(player instanceof Player).to.be.true;
		expect(player.id).to.equal('a');
	});
	it('should return null if player cannot be found', () => {
		const round = new Round({ roundNumber, players, dealer, deck });
		const player = round.getPlayer({ id: 'bad' });
		expect(player).to.be.null;
	});
});