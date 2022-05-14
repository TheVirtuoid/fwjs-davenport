// const round = new Round({ roundNumber, players, deck, dealer });
// all are required

import Round from "../../../src/Round/Round.js";
import Player from "../../../src/Player/Player";

const playerA = new Player({ id: 'a' });
const playerB = new Player({ id: 'b' });
const players = [ playerA, playerB ];
const roundNumber = 1;
const deck = new Deck();
const dealer = playerA;

describe('round constructor', () => {
	it('should throw exception if roundNumber missing', () => {
		try {
			const round = new Round({ players, deck, dealer });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if players missing', () => {
		try {
			const round = new Round({ roundNumber, deck, dealer });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if deck missing', () => {
		try {
			const round = new Round({ players, roundNumber, dealer });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if dealer missing', () => {
		try {
			const round = new Round({ players, deck, roundNumber });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if roundNumber not numeric', () => {
		try {
			const round = new Round({ players, deck, dealer, roundNumber: 'a' });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if roundNumber <= 0', () => {
		try {
			const round = new Round({ players, deck, dealer, roundNumber: -1 });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if players is not an array', () => {
		try {
			const round = new Round({ roundNumber, players: 'a', deck, dealer });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if players is not an array of Player', () => {
		try {
			const round = new Round({ roundNumber, players: [1, 2], deck, dealer });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if deck is not instanceof Deck', () => {
		try {
			const round = new Round({ roundNumber, players, deck: 'a', dealer });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if dealer is not instanceof Player', () => {
		try {
			const round = new Round({ roundNumber, players, deck, dealer: 'a' });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should throw exception if dealer is not part of Players array', () => {
		try {
			const round = new Round({ roundNumber, players, deck, dealer: new Player({ id: 'c' }) });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});