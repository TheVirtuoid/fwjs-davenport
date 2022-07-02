import Player from "../../../src/classes/Player/Player.js";
import {StandardCard, StandardCardRanks, StandardCardSuits} from "@virtuoid/standard-card";

describe('setLockedCard', () => {
	it('should throw exception if card is not instance of Card', () => {
		const player = new Player({ human: false });
		try {
			player.setLockedCard('bad');
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});

	it('should throw exception if card is not inside the deck', () => {
		const player = new Player({ human: false });
		const card = new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.ACE, value: 2});
		player.deck.add(new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.ACE, value: 1}));
		try {
			player.setLockedCard(card);
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('Error');
		}
	});
	it('should set the locked card', () => {
		const player = new Player({ human: false });
		const card = new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.ACE, value: 1});
		player.deck.add(card);
		player.setLockedCard(card);
		expect(player.lockedCard.is(card)).to.be.true;
	});
});