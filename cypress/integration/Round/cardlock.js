import Player from './../../../src/Player/Player.js';

const players = [ new Player(), new Player(), new Player(), new Player() ];

describe('cardlocking', () => {
	it('should wait for each player to lock in a card', () => {
		const game = new Game({ })
		// TODO: not sure how to test for asynchronous code
	});
	it('should allow for a player to exchange a card', () => {});
	it('when exchanging a card, the card is immediately locked', () => {});
	it('should not allow to exchange a card when a card is locked', () => {});
});