import Player from "../Player/Player.js";
import Deck from "@virtuoid/deck";

export default class Round {
	#deck;
	#players;
	#roundNumber;
	#winners;
	#gameOver;
	#error;
	#discardDeck;

	constructor(roundArguments = {}) {
		const { deck, players, roundNumber, discardDeck } = roundArguments;
		if (!(discardDeck instanceof Deck)) {
			throw new TypeError(`"discardDeck" property must be an instance of the Deck class.`);
		}
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
		this.#deck = deck;
		this.#discardDeck = discardDeck;
		this.#players = players;
		this.#roundNumber = integerRoundNumber;
		this.#gameOver = false;
		this.#error = null;
		this.#winners = [];
	}

	get deck() {
		return this.#deck;
	}

	get discardDeck() {
		return this.#discardDeck;
	}

	get roundNumber() {
		return this.#roundNumber;
	}

	get winners () {
		return this.#winners;
	}

	get gameOver () {
		return this.#gameOver;
	}

	get numPlayers () {
		return this.#players.length;
	}

	get error() {
		return this.#error;
	}

	#clearWinners() {
		this.#winners = [];
	}

	#addWinner(player) {
		this.#winners.push(player);
	}

	getPlayer(searchParameters = {}) {
		const { id } = searchParameters;
		return this.#players.find((player) => player.id === id) || null;
	}

	#lockCards () {
		const promises = [];
		this.#players.forEach((player) => {
			promises.push(this.#getLockedCard(player));
		});
		const round = this;
		return new Promise((resolve, reject) => {
			Promise.all(promises)
					.then(() => resolve(round))
					.catch((err) => reject(err));
		});
	}

	#getWinners () {
		let highCardValue = -1;
		this.#clearWinners()
		this.#players.forEach((player) => {
			if (player.lockedCard.value > highCardValue) {
				this.#clearWinners();
				this.#addWinner(player);
				highCardValue = player.lockedCard.value;
			} else if (player.lockedCard.value === highCardValue) {
				this.#addWinner(player);
			}
		});
		return Promise.resolve(this);
	}

	#moveLockedCardsToDiscardDeck() {
		const promises = [];
		this.#players.forEach((player) => {
			promises.push(new Promise((resolve, reject) => {
				player.removeLockedCard()
						.then((card) => {
							this.#discardDeck.add(card);
							resolve(true);
						});
			}));
		});
		return Promise.all(promises);
	}

	#replaceCards () {
		const checkWinner = this.winners.length === 1;
		this.#players.forEach((player) => {
			if (!checkWinner || checkWinner && player !== this.#winners[0]) {
				if (this.#deck.cardCount === 0) {
					while(this.#discardDeck.cardCount > 0) {
						this.#discardDeck.deal(this.#deck);
					}
					this.#deck.shuffle();
				}
				this.#deck.deal(player.deck);
			}
		});
		return Promise.resolve(this);
	}

	#checkForGameOver () {
		this.#gameOver = this.#winners.length === 1 && this.#winners[0].deck.cardCount === 0;
		return Promise.resolve(this);
	}

	#getLockedCard (player) {
		return new Promise((resolve, reject) => {
			player.getLockedCard()
					.then(player => {
						resolve(player);
					})
					.catch((err) => {
						err.player = player;
						reject(err);
					});
		});
	}

	play () {
		return new Promise((resolve, reject) => {
			this.#lockCards()
					.then(this.#getWinners.bind(this))
					.then(this.#moveLockedCardsToDiscardDeck.bind(this))
					.then(this.#replaceCards.bind(this))
					.then(this.#checkForGameOver.bind(this))
					.then(resolve)
					.catch((err) => {
						this.#gameOver = true;
						this.#error = { exception: err, player: err.player };
						this.#winners = [];
						resolve(this);
					});
		});
	}

}
