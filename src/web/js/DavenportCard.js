import {StandardCard} from "@virtuoid/standard-card";

export default class DavenportCard {
	#standardCard
	#dom;
	#faceUp;

	constructor(davenportCardArguments = {}) {
		const { standardCard, faceUp = false } = davenportCardArguments;
		this.#standardCard = standardCard;
		this.#dom = document.createElement('span');
		this.#dom.classList.add('card');
		faceUp ? (this.faceUp()) : (this.faceDown());
		this.#faceUp = faceUp;
	}

	get dom () {
		return this.#dom;
	}

	get faceUp() {
		return this.#faceUp;
	}

	faceDown () {
		this.#dom.innerHTML = '';
		this.#dom.classList.add('back');
		this.#faceUp = false;
	}

	faceUp () {
		if (this.#standardCard) {
			let card = `<span>${this.#standardCard.rank.abbreviation.toUpperCase()}&#${DavenportCard.cardMapping.get(this.#standardCard.suit.abbreviation)};</span>`;
			card = `${card}<span>&#${DavenportCard.cardMapping.get(this.#standardCard.suit.abbreviation)};</span>`;
			card = `${card}<span>${this.#standardCard.rank.abbreviation.toUpperCase()}&#${DavenportCard.cardMapping.get(this.#standardCard.suit.abbreviation)};</span>`;
			this.#dom.innerHTML = card;
			this.#dom.classList.add(this.#standardCard.suit.name);
		}
		this.#dom.classList.remove('back');
		this.#faceUp = true;
	}

	static cardMapping = new Map([
		['s', 9824],
		['h', 9829],
		['d', 9830],
		['c', 9827],
	])

}