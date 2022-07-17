import { v4 as uuidV4 } from 'uuid';
import Player from "../Player/Player.js";
import {StandardCard, StandardCardRanks, StandardCardSuits} from "@virtuoid/standard-card";
import Deck from "@virtuoid/deck";
import Round from "../Round/Round.js";

const valueMap = new Map();
valueMap.set(StandardCardRanks.ACE, 1);
valueMap.set(StandardCardRanks.TWO, 2);
valueMap.set(StandardCardRanks.THREE, 3);
valueMap.set(StandardCardRanks.FOUR, 4);
valueMap.set(StandardCardRanks.FIVE, 5);
valueMap.set(StandardCardRanks.SIX, 6);
valueMap.set(StandardCardRanks.SEVEN, 7);
valueMap.set(StandardCardRanks.EIGHT, 8);
valueMap.set(StandardCardRanks.NINE, 9);
valueMap.set(StandardCardRanks.TEN, 10);
valueMap.set(StandardCardRanks.JACK, 11);
valueMap.set(StandardCardRanks.QUEEN, 12);
valueMap.set(StandardCardRanks.KING, 13);

export default class Game {
	#id;
	#players;
	#deck;
	#cardsPerPlayer = 5;
	#rounds;
	#roundNumber;
	#gameOver;
	#error;
	#dealer;
	#winner;
	#discardDeck;
	#callbacks;

	constructor(gameArguments = {}) {
		const { id = uuidV4(), players = [] } = gameArguments;
		if (typeof(id) !== 'string') {
			throw new TypeError(`"id" argument must be a string.`);
		}
		if (!(players instanceof Array) || !players.every((player) => player instanceof Player)) {
			throw new TypeError(`"players" argument must be an array of Player.`);
		}
		this.#id = id;
		this.#players = players;
		this.#rounds = [];
		this.#gameOver = null;
		this.#error = {
			err: null,
			player: null
		}
		this.#discardDeck = new Deck();
	}

	get id() {
		return this.#id;
	}

	get players() {
		return this.#players;
	}

	get deck() {
		return this.#deck;
	}

	get gameOver() {
		return this.#gameOver;
	}

	get error() {
		return this.#error;
	}

	get winner() {
		return this.#winner;
	}

	get rounds() {
		return this.#rounds;
	}

	initialize(initializeArguments = {}) {
		const { dealer, callbacks = {} } = initializeArguments;
		if (!(dealer instanceof Player)) {
			throw new TypeError(`"dealer" argument is not of a type Player.`);
		}
		if (!(this.#players.some((player) => player === dealer))) {
			throw new RangeError(`"dealer" argument must be a player actually in the game.`);
		}
		if (!Object.getOwnPropertyNames(callbacks).every((key) => typeof(callbacks[key]) === 'function')) {
			throw new TypeError(`"callbacks" key/value list must contain all functions.`);
		}
		const cards = [];
		StandardCardSuits.LIST.forEach((suit) => {
			StandardCardRanks.LIST.forEach((rank) => {
				cards.push(new StandardCard({ suit, rank, value: valueMap.get(rank) }))
			});
		});
		this.#dealer = dealer;
		this.#callbacks = callbacks;
		this.#deck = new Deck({ cards });
		this.#deck.shuffle();
		this.#rounds = [];
		let nextPlayer = this.#getNextPlayerForDeal(dealer);
		for(let cardIndex = 0; cardIndex < this.#cardsPerPlayer; cardIndex++) {
			for (let playerIndex = 0; playerIndex < this.#players.length; playerIndex++) {
				this.#deck.deal(nextPlayer.deck);
				nextPlayer = this.#getNextPlayerForDeal(nextPlayer);
			}
		}
	}

	async start () {
		this.#roundNumber = 0;
		while (!this.#gameOver && !this.#error?.err) {
			await(this.#playRound());
		}
	}

	async #playRound() {
		this.#roundNumber++;
		const round = new Round({
			roundNumber: this.#roundNumber,
			players: this.#players,
			deck: this.#deck,
			discardDeck: this.#discardDeck,
			callbacks: this.#callbacks
		});
		this.#rounds.push(round);
		await round.play(round);
		this.#gameOver = round.gameOver;
		this.#error = round.error;
		this.#winner = this.#gameOver && !this.#error ? round.winners[0] : null;
	}

	#getNextPlayerForDeal(previousPlayer) {
		let currentIndex = this.#players.findIndex((player) => player === previousPlayer);
		currentIndex = currentIndex === this.#players.length - 1 ? 0 : currentIndex + 1;
		return this.#players[currentIndex];
	}
}