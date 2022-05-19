import Player from "../Player/Player";
import Deck from "@virtuoid/deck";

export default class Round {
	#deck;
	#players;
	#roundNumber;
	#dealer;
	#nextDealer;
	#winners;
	#gameOver;

	constructor(roundArguments = {}) {
		const {deck, players, roundNumber, dealer} = roundArguments;
		if (!(deck instanceof Deck)) {
			throw new TypeError(`"deck" property must be an instance of the Deck class.`);
		}
		if (!(players instanceof Array)) {
			throw new TypeError(`"players" property must be an Array.`);
		}
		if (!players.every((player) => player instanceof Player)) {
			throw new TypeError(`"players" property must be an Array of Player instances.`);
		}
		if (typeof (roundNumber) !== 'number') {
			throw new TypeError(`"roundNumber" must be a number.`);
		}
		const integerRoundNumber = Math.trunc(roundNumber);
		if (integerRoundNumber < 1) {
			throw new RangeError(`"roundNumber" must be a positive number.`);
		}
		if (!(dealer instanceof Player)) {
			throw new TypeError(`"dealer" property not instance of Player.`);
		}
		if (!players.some((player) => player === dealer)) {
			throw new RangeError(`"dealer" property must be a Player in this round.`);
		}
		this.#deck = deck;
		this.#players = players;
		this.#roundNumber = integerRoundNumber;
		this.#dealer = dealer;
	}

	get deck() {
		return this.#deck;
	}

	get roundNumber() {
		return this.#roundNumber;
	}

	get dealer () {
		return this.#dealer;
	}

	get nextDealer () {
		return this.#nextDealer;
	}

	set nextDealer(value) {
		this.#nextDealer = value;
	}

	get winners () {
		return this.#winners;
	}

	get gameOver () {
		return this.#gameOver;
	}

	set gameOver(value) {
		this.#gameOver = value;
	}

	get players () {
		return this.#players;
	}

	get winners () {
		return this.#winners;
	}

	get numPlayers () {
		return this.#players.length;
	}

	clearWinners() {
		this.#winners = [];
	}

	addWinner(player) {
		this.#winners.push(player);
	}

	getPlayer(searchParameters = {}) {
		const { id } = searchParameters;
		return this.#players.find((player) => player.id === id) || null;
	}

	lockCards (round) {
		return new Promise((resolve, reject) => {
			const promises = [];
			round.players.forEach((player) => {
				promises.push(round.getLockedCard(player));
			});
			Promise.all(promises)
					.then(() => resolve(round))
					.catch((err) => reject(err));
		});
	}

	getWinners (round) {
		let highCardValue = -1;
		round.clearWinners()
		round.players.forEach((player) => {
			if (player.lockedCard.value > highCardValue) {
				round.clearWinners();
				round.addWinner(player);
				highCardValue = player.lockedCard.value;
			} else if (player.lockedCard.value === highCardValue) {
				round.addWinner(player);
			}
		});
		return Promise.resolve(round);
	}

	replaceCards (round) {
		const checkWinner = round.winners.length === 1;
		round.players.forEach((player) => {
			if (!checkWinner || checkWinner && player !== round.winners[0]) {
				round.deck.deal(player.deck);
			}
		});
		return Promise.resolve(round);
	}

	checkForGameOver (round) {
		round.nextDealer = null;
		round.gameOver = round.players.find((player) => player.deck.cardCount === 0) || null;
		if (!round.gameOver) {
			let dealerIndex = round.players.findIndex((player) => player === round.dealer) + 1;
			dealerIndex = dealerIndex === round.players.length ? 0 : dealerIndex;
			round.nextDealer = round.players[dealerIndex];
		}
		return Promise.resolve(round);
	}

	getLockedCard (player) {
		return new Promise((resolve, reject) => {
			player.getLockedCard()
					.then(player => {
						resolve(player);
					})
					.catch((err) => {
						reject(err);
					});
		});
	}
}
