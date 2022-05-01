import Player from './../../../src/Player/Player.js';
import Deck from "@virtuoid/deck";

describe('player deck', () => {
	it('should set dek to be an Array', () => {
		const player = new Player();
		expect(player.deck instanceof Deck).to.be.true;
	});
	it('should set the initial deck to 0 cards', () => {
		const player = new Player();
		expect(player.deck.cardCount).to.equal(0);
	});
});