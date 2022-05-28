import Deck from "@virtuoid/deck";
import { v4 as uuidV4 } from 'uuid';

export default class Player {
	#id;
	#human;
	#lockedCard;
	#deck;

	constructor(playerArguments = {}) {
		const { id, human = false } = playerArguments;
		this.#id = id || uuidV4();
		this.#human = human;
		this.#lockedCard = null;
		this.#deck = new Deck();
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

	getLockedCard() {
		if (!this.#human) {
			this.#deck.sort((cardA, cardB) => cardB.value - cardA.value);
			this.#lockedCard = this.#deck.remove();
			return Promise.resolve(this);
		} else {
			return Promise.reject(new Error('timeout waiting for player to lock card.'));
		}
	}
}