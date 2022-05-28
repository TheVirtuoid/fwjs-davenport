import Player from "../../../src/Player/Player.js";

import Deck from "@virtuoid/deck";

describe('deck property', () => {
	it('should create the deck property', () => {
		const player = new Player();
		expect(player.deck instanceof Deck).to.be.true;
	});
	it('should have a deck that is empty', () => {
		const player = new Player();
		expect(player.deck.cardCount).to.equal(0);
	});
	it('should NOT be able to change the deck property', () => {
		const player = new Player();
		try {
			player.deck = 'bad';
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});