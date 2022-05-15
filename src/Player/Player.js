import Deck from "@virtuoid/deck";

export default class Player {
	#id;
	#human;
	#lockedCard;
	#deck;

	constructor(playerArguments = {}) {
		const { id, human = false } = playerArguments;
		this.#id = id;
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

	set human(value) {
		this.#human = value;
	}

	get deck () {
		return this.#deck;
	}

	get lockedCard() {
		return this.#lockedCard;
	}

	getLockedCard() {
		if (!this.#human) {
			this.#deck.sort((cardA, cardB) => cardA.value - cardB.value);
			this.#lockedCard = this.#deck.remove();
			return Promise.resolve(this);
		} else {
			return Promise.reject(new Error('timeout waiting for player to lock card.'));
		}
	}
}