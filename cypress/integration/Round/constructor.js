// const round = new Round({ roundNumber, players, deck, dealer });
// all are required

import Round from "../../../src/Round/Round.js";
import Player from "../../../src/Player/Player";

const players = [ new Player(), new Player() ];
const roundNumber = 1;
const deck = new Deck();
const dealer = 0;

describe('round constructor', () => {
	it('should throw exception if roundNumber missing', () => {});
	it('should throw exception if players missing', () => {});
	it('should throw exception if deck missing', () => {});
	it('should throw exception if dealer missing', () => {});
	it('should throw exception if roundNumber not numeric', () => {});
	it('should throw exception if roundNumber <= 0', () => {});
	it('should throw exception if players is not an array', () => {});
	it('should throw exception if players is not an array of Player', () => {});
	it('should throw exception if deck is not instanceof Deck', () => {});
	it('should throw exception if dealer is not numeric', () => {});
	it('should throw exception if dealer is not an index of the Players array', () => {});

	it('must return a round', () => {
		const round = new Round({ roundNumber, players });
		expect(round instanceof Round).to.be.true;
	});
	it('should return a round number if specified', () => {
		const round = new Round({ roundNumber, players });
		expect(round.roundNumber).to.equal(1);
	});
	it('should throw an exception if roundNumber is not present', () => {
		try {
			const round = new Round({ players });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('Error');
		}
	});
	it('should have a players parameter', () => {
		const round = new Round({ roundNumber, players });
		expect(round.players instanceof Array).to.be.true;
		expect(round.players.length).to.equal(players.length);
	});
	it('should throw exception if players is not present', () => {
		try {
			const round = new Round({ roundNumber });
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('Error');
		}
	});
});