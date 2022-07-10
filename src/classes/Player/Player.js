import Deck from "@virtuoid/deck";
import { v4 as uuidV4 } from 'uuid';
import { StandardCard } from "@virtuoid/standard-card";

export default class Player {
	#id;
	#human;
	#lockedCard;
	#deck;
	#lockedCardTimeoutSeconds;
	#lockedCardPollingMilliseconds = 10;
	#avatar;

	constructor(playerArguments = {}) {
		const { id, human = false, lockedCardTimeoutSeconds = 3, avatar = '' } = playerArguments;
		this.#id = id || uuidV4();
		this.#human = human;
		this.#lockedCard = null;
		this.#deck = new Deck();
		this.#lockedCardTimeoutSeconds = lockedCardTimeoutSeconds;
		this.#avatar = avatar;
	}

	get id () {
		return this.#id;
	}

	get human() {
		return this.#human;
	}

	get deck () {
		return this.#deck;
	}

	get lockedCard() {
		return this.#lockedCard;
	}

	get avatar() {
		return this.#avatar;
	}

	getLockedCard() {
		const player = this;
		return new Promise((resolve, reject) => {
			if (!player.#human) {
				player.#deck.sort((cardA, cardB) => cardB.value - cardA.value);
				player.#lockedCard = player.#deck.remove();
				resolve(player);
			} else {
				let countDown = player.#lockedCardTimeoutSeconds * 100;
				const playerInteractionTimer = setInterval(() => {
					if (countDown === 0) {
						clearInterval(playerInteractionTimer);
						reject(new Error('timeout waiting for player to lock card.'));
					}
					if (player.lockedCard !== null) {
						clearInterval(playerInteractionTimer);
						resolve(player);
					}
					countDown--;
				}, player.#lockedCardPollingMilliseconds);
			}
		});
	}

	setLockedCard(card) {
		if (!(card instanceof StandardCard)) {
			throw new TypeError(`'card' argument is not an instance of Card.`);
		}
		const cardToRemoveIndex = this.#deck.findCard(card);
		if (cardToRemoveIndex === -1) {
			throw new Error(`'card' argument is not a card within the deck.`);
		}
		this.#lockedCard = this.#deck.remove(cardToRemoveIndex);
	}

	removeLockedCard() {
		const card = this.#lockedCard;
		this.#lockedCard = null;
		return Promise.resolve(card);
	}
}