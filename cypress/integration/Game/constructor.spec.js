/*
	const game = new Game({ gameArguments });
		where gameArguments:
			id: string, optional - will generate UUID if required
			players: array<Player>, optional - will generate empty array.

	A game process is as follows:

		1. A game is created
		2. A new deck is initialized (passing the starting dealer)
		3. Players are dealt starting hand
		4. Rounds are played until there is a winner.
		5. Game is over.

		// FUTURE addPlayer(Player) - adds a player, exception on not Player or adding after game is full
		// FUTURE removePlayer(Player) - removes the player, exception on not Player. No action if player is not there
		initialize(dealer) - creates the deck, deals the cards
		start() - starts the first round


 */

import Game from "../../../src/classes/Game/Game.js";

describe('constructing the game', () => {
	it('should return a Game', () => {
		const game = new Game();
		expect(game instanceof Game).to.be.true;
	});
	it('should default to string id', () => {
		const game = new Game();
		expect(typeof(game.id)).to.equal('string');
	});
	it('should default to empty array for players', () => {
		const game = new Game();
		expect(game.players instanceof Array).to.be.true;
		expect(game.players.length).to.equal(0);
	});
	it('should return id if specified', () => {
		const game = new Game({ id: 'a' });
		expect(game.id).to.equal('a');
	});
	it('should throw exception if id is not a string', () => {
		try {
			new Game({ id: 0 });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if players is not an array', () => {
		try {
			new Game({ players: 'bad' });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if players array does not contain all Player', () => {
		try {
			new Game({ players: [ 1, 2, 3, 4 ] });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});
