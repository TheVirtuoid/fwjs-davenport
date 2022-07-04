import Player from "../../../src/classes/Player/Player.js";
import {StandardCard, StandardCardRanks, StandardCardSuits} from "@virtuoid/standard-card";

describe('removeLockedCard', () => {
	it('should remove the card', () => {
		const player = new Player({ human: false });
		const card = new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.ACE, value: 2});
		player.deck.add(card);
		player.setLockedCard(card);
		cy.wrap(null)
				.then(() => {
					return new Promise((resolve, reject) => {
						player.removeLockedCard(card)
								.then(resolve);
					});
				})
				.then((removedCard) => {
					expect(removedCard.is(card)).to.be.true;
				});
	});

	it('should return null if no locked card', () => {
		const player = new Player({ human: false });
		const card = new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.ACE, value: 2});
		player.deck.add(card);
		cy.wrap(null)
				.then(() => {
					return new Promise((resolve, reject) => {
						player.removeLockedCard(card)
								.then(resolve);
					});
				})
				.then((removedCard) => {
					expect(removedCard).to.be.null;
				});
	});
});