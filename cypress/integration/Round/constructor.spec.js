// const round = new Round({ roundNumber, players, deck, dealer });
// all are required

import Round from "../../../src/Round/Round.js";
import Player from "../../../src/Player/Player.js";
import Deck from "@virtuoid/deck";

const playerA = new Player({ id: 'a' });
const playerB = new Player({ id: 'b' });
const players = [ playerA, playerB ];
const roundNumber = 1;
const deck = new Deck();
const dealer = playerA;

describe('round constructor', () => {
	it('should throw exception if roundNumber missing', () => {
		try {
			new Round({ players, deck, dealer });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if players missing', () => {
		try {
			new Round({ roundNumber, deck, dealer });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if deck missing', () => {
		try {
			new Round({ players, roundNumber, dealer });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if dealer missing', () => {
		try {
			new Round({ players, deck, roundNumber });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if roundNumber not numeric', () => {
		try {
			new Round({ players, deck, dealer, roundNumber: 'a' });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if roundNumber <= 0', () => {
		try {
			new Round({ players, deck, dealer, roundNumber: -1 });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('RangeError');
		}
	});
	it('should throw exception if players is not an array', () => {
		try {
			new Round({ roundNumber, players: 'a', deck, dealer });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if players is not an array of Player', () => {
		try {
			new Round({ roundNumber, players: [1, 2], deck, dealer });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if deck is not instanceof Deck', () => {
		try {
			new Round({ roundNumber, players, deck: 'a', dealer });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if dealer is not instanceof Player', () => {
		try {
			new Round({ roundNumber, players, deck, dealer: 'a' });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if dealer is not part of Players array', () => {
		try {
			new Round({ roundNumber, players, deck, dealer: new Player({ id: 'c' }) });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('RangeError');
		}
	});
});