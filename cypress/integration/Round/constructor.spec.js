// const round = new Round({ roundNumber, players, deck });
// all are required

import Round from "../../../src/Round/Round.js";
import Player from "../../../src/Player/Player.js";
import Deck from "@virtuoid/deck";

const playerA = new Player({ id: 'a' });
const playerB = new Player({ id: 'b' });
const players = [ playerA, playerB ];
const roundNumber = 1;
const deck = new Deck();

describe('round constructor', () => {
	it('should throw exception if roundNumber missing', () => {
		try {
			new Round({ players, deck });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if players missing', () => {
		try {
			new Round({ roundNumber, deck });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if deck missing', () => {
		try {
			new Round({ players, roundNumber });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if roundNumber not numeric', () => {
		try {
			new Round({ players, deck, roundNumber: 'a' });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if roundNumber <= 0', () => {
		try {
			new Round({ players, deck, roundNumber: -1 });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('RangeError');
		}
	});
	it('should throw exception if players is not an array', () => {
		try {
			new Round({ roundNumber, players: 'a', deck });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if players is not an array of Player', () => {
		try {
			new Round({ roundNumber, players: [1, 2], deck });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if deck is not instanceof Deck', () => {
		try {
			new Round({ roundNumber, players, deck: 'a' });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});