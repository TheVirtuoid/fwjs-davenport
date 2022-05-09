describe('numPlayers', () => {
	it('should return the number of players', () => {
		const round = new Round({ roundNumber: 1, players: [new Player(), new Player() ], dealer: 0, deck: new Deck()});
		expect(round.numPlayers).to.equal(2);
	});
	it('should throw exception is trying to change numPlayers', () => {
		const round = new Round({ roundNumber: 1, players: [new Player(), new Player() ], dealer: 0, deck: new Deck()});
		try {
			round.numPlayers = 5;
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}

	});
});