// round.getPlayer(options)
// options = key/value pair to compare against. Only
describe('getPlayer', () => {
	it('should return the Player instance if the player is found', () => {
		const round = new Round({ roundNumber: 1, players: [new Player({ id: 'a' }), new Player({ id: 'b' }) ], dealer: 0, deck: new Deck()});
		const player = round.getPlayer({ id: 'a' });
		expect(player instanceof Player).to.be.true;
		expect(player.id).to.equal('a');
	});
	it('should return null if player cannot be found', () => {
		const round = new Round({ roundNumber: 1, players: [new Player({ id: 'a' }), new Player({ id: 'b' }) ], dealer: 0, deck: new Deck()});
		const player = round.getPlayer({ id: 'a' });
		expect(player).to.be.null;
	});
});