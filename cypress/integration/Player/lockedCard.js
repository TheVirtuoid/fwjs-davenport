import Player from "../../../src/classes/Player/Player.js";
import {StandardCard, StandardCardRanks, StandardCardSuits} from "@virtuoid/standard-card";

describe('lockedCard', () => {
	it('should lock the card', () => {
		const player = new Player({ human: false });
		const card = new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.ACE, value: 1});
		player.deck.add(new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.ACE, value: 1}));
		player.getLockedCard()
				.then(() => {
					expect(player.lockedCard.is(card)).to.be.true;
				})
				.catch((err) => {
					expect(true).to.be.false;
				});
	});
	it('should throw exception on card when player is human', () => {
		const player = new Player({ human: true });
		const card = new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.ACE, value: 1});
		player.deck.add(new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.ACE, value: 1}));
		player.getLockedCard()
				.then(() => {
					expect(true).to.be.false;
				})
				.catch((err) => {
					expect(err.name).to.equal('Error');
				});
	});
	it('should throw exception if attempting to change the lockedCard', () => {
		const player = new Player();
		try {
			player.lockedCard = 'bad';
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should remove the locked card', () => {
		const player = new Player({ human: false });
		const card = new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.ACE, value: 1});
		player.deck.add(new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.ACE, value: 1}));
		player.getLockedCard()
				.then(player.removeLockedCard.bind(player))
				.then((oldLockedCard) => {
					expect(player.lockedCard).to.be.null;
					expect(oldLockedCard.is(card)).to.be.true;
				})
				.catch((err) => {
					expect(true).to.be.false;
				});
	});
	it('should return null if there is no locked card to remove', () => {
		const player = new Player({ human: false });
		const card = new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.ACE, value: 1});
		player.deck.add(new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.ACE, value: 1}));
		player.removeLockedCard()
				.then((oldLockedCard) => {
					expect(oldLockedCard).to.be.null;
				})
				.catch((err) => {
					expect(true).to.be.false;
				});
	});

});