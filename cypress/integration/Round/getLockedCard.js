import Deck from "@virtuoid/deck";
import {copyDeck, standardCardDeck, dealCards, initializeTest, valueMapping} from "../../fixtures/standardDeck";
import {StandardCardRanks, StandardCardSuits} from "@virtuoid/standard-card";

describe('getting a locked card from a player', () => {
	let round;
	let roundNumber;
	let dealer;
	let players;
	let deck;
	let playerA;
	let playerB;

	beforeEach( () => {
		({ deck, players, roundNumber, dealer, round } = initializeTest([
			{ id: 'a', human: false },
			{ id: 'b', human: false }
		]));
		playerA = round.getPlayer({ id: 'a' });
		playerB = round.getPlayer({ id: 'b' });
	});

	it('should lock high card for Player0', () => {
		const playerACard = new Card({
			suit: StandardCardSuits.CLUB,
			rank: StandardCardRanks.TEN,
			value: valueMapping.get(StandardCardRanks.TEN)
		});
		round.getLockedCard(playerA)
				.then((player) => {
					expect(player.lock.is(playerACard)).to.be.true;
				});
	});

	it('should FAIL to get a lock because player is human', () => {
		({ deck, players, roundNumber, dealer, round } = initializeTest([
			{ id: 'a', human: true },
			{ id: 'b', human: false }
		]));
		playerA = round.getPlayer({ id: 'a' });
		round.getLockedCard(playerA)
				.then((player) => {
					expect(true).to.be.false;
				})
				.catch((err) => {
					expect(err.name).to.equal('Error');
					expect(playerA.lock).to.be.null;
				});
	})
});