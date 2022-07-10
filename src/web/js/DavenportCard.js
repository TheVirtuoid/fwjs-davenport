import {StandardCard} from "@virtuoid/standard-card";

export default class DavenportCard {
	#standardCard
	#dom;
	#revealed;

	constructor(davenportCardArguments = {}) {
		const { standardCard, faceUp = false, blank = false } = davenportCardArguments;
		this.#standardCard = standardCard;
		this.#dom = document.createElement('span');
		this.#dom.classList.add('card');
		faceUp ? (this.faceUp()) : (this.faceDown());
		this.#revealed = faceUp;
		this.#dom.card = standardCard;
	}

	get dom () {
		return this.#dom;
	}

	get revealed() {
		return this.#revealed;
	}

	get suit() {
		return this.#standardCard.suit;
	}

	faceDown () {
		this.#dom.innerHTML = '';
		this.#dom.classList.add('back');
		this.#revealed = false;
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
		this.#revealed = true;
	}

	static cardMapping = new Map([
		['s', 9824],
		['h', 9829],
		['d', 9830],
		['c', 9827],
	])

	static get discardDeckCard() {
		const div = document.createElement('div');
		div.classList.add('locked-card', 'discard-deck');
		div.insertAdjacentHTML('afterbegin', '<span class="name"></span><span class="card back"></span>');
		return div;
	}

	static get blankCard() {
		const card = document.createElement('span');
		card.classList.add('card', 'blank');
		return card;
	}

	static replace(cardTo, cardFrom) {
		cardTo.innerHTML = cardFrom.innerHTML;
		cardTo.classList.remove(...cardTo.classList);
		cardTo.classList.add(...cardFrom.classList);
		cardTo.card = cardFrom.card;
	}
}