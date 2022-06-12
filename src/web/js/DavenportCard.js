import {StandardCard} from "@virtuoid/standard-card";

export default class DavenportCard {
	#standardCard
	#dom;

	constructor(davenportCardArguments = {}) {
		const { standardCard } = davenportCardArguments;
		this.#standardCard = standardCard;
		let card;
		const classList = ['card'];
		if (standardCard instanceof StandardCard) {
			card = `<span>${this.#standardCard.rank.abbreviation.toUpperCase()}&#${DavenportCard.cardMapping.get(this.#standardCard.suit.abbreviation)};</span>`;
			card = `${card}<span>&#${DavenportCard.cardMapping.get(this.#standardCard.suit.abbreviation)};</span>`;
			card = `${card}<span>${this.#standardCard.rank.abbreviation.toUpperCase()}&#${DavenportCard.cardMapping.get(this.#standardCard.suit.abbreviation)};</span>`;
			classList.push(this.#standardCard.suit.name);
		} else {
			card = `<span></span><span></span><span></span>`;
			classList.push('back');
		}
		const dom = document.createElement('span');
		dom.classList.add(...classList);
		dom.insertAdjacentHTML('afterbegin', card);
		this.#dom =  dom;
	}

	get dom () {
		return this.#dom;
	}

	static cardMapping = new Map([
		['s', 9824],
		['h', 9829],
		['d', 9830],
		['c', 9827],
	])

}