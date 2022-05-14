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

	it('should lock cards for all players', () => {
		round.lockCards()
				.then((round) => {
					expect(playerA.lock).to.not.be.null;
					expect(playerB.lock).to.not.be.null;
				});
	});

	it('should FAIL to get a lock because player is human', () => {
		({ deck, players, roundNumber, dealer, round } = initializeTest([
			{ id: 'a', human: true },
			{ id: 'b', human: false }
		]));
		playerA = round.getPlayer({ id: 'a' });
		round.lockCards(record)
				.then((round) => {
					expect(true).to.be.false;
				})
				.catch((err) => {
					expect(err.name).to.equal('Error');
					expect(playerA.lock).to.be.null;
				});
	})
});