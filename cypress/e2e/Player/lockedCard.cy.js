import Player from "../../../src/classes/Player/Player.js";
import {StandardCard, StandardCardRanks, StandardCardSuits} from "@virtuoid/standard-card";

describe('lockedCard', () => {

	it('should lock the card', () => {
		const player = new Player({ human: false });
		const card = new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.ACE, value: 1});
		player.deck.add(new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.ACE, value: 1}));
		cy.on('uncaught:exception', (err, runnable) => {
			expect(true).to.be.false;
		});
		cy.wrap(null)
				.then(() => {
					return new Promise((resolve, reject) => {
						player.getLockedCard.bind(player)()
								.then(() => {
									resolve(player.lockedCard.is(card));
								})
								.catch((err) => {
									resolve(err.name);
								});
					});
				})
				.then((result) => {
					expect(result).to.be.true;
				});
	});

	it('should throw exception on card when player is human, and no card selected in timeout', () => {
		const player = new Player({ human: true });
		const card = new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.ACE, value: 1});
		player.deck.add(new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.ACE, value: 1}));
		cy.wrap(null)
				.then(() => {
					return new Promise((resolve, reject) => {
						player.getLockedCard.bind(player)()
								.then(() => {
									resolve(true);
								})
								.catch((err) => {
									resolve(err.name);
								});
					});
				})
				.then((result) => {
					expect(result).to.equal('Error');
				});
	});

	it('should record the lockedCard when player is human, and card selected in timeout', () => {
		const player = new Player({ human: true });
		const card = new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.ACE, value: 1});
		player.deck.add(card);
		cy.wrap(null)
				.then(() => {
					return new Promise((resolve, reject) => {
						setTimeout(() => {
							player.setLockedCard(card);
						}, 1000);
						player.getLockedCard.bind(player)()
								.then(() => {
									resolve(player.lockedCard.is(card));
								})
								.catch((err) => {
									resolve(err.name);
								});
					});
				})
				.then((result) => {
					expect(result).to.be.true;
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
		cy.wrap(null)
				.then(() => {
					return new Promise((resolve, reject) => {
						player.getLockedCard.bind(player)()
								.then(player.removeLockedCard.bind(player))
								.then((oldLockedCard) => {
									resolve(oldLockedCard);
								})
								.catch((err) => {
									resolve(err.name);
								});
					});
				})
				.then((oldLockedCard) => {
					expect(player.lockedCard).to.be.null;
					expect(oldLockedCard.is(card)).to.be.true;
				});
	});

	it('should return null if there is no locked card to remove', () => {
		const player = new Player({ human: false });
		const card = new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.ACE, value: 1});
		player.deck.add(new StandardCard({ suit: StandardCardSuits.CLUB, rank: StandardCardRanks.ACE, value: 1}));
		cy.wrap(null)
				.then(() => {
					return new Promise((resolve, reject) => {
						player.removeLockedCard.bind(player)()
								.then((oldLockedCard) => {
									resolve(oldLockedCard);
								})
								.catch((err) => {
									resolve(err.name);
								});
					});
				})
				.then((oldLockedCard) => {
					expect(oldLockedCard).to.be.null;
				});
	});

});