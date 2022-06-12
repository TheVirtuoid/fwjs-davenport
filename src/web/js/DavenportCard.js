
export default class DavenportCard {
	#standardCard
	#dom;

	constructor(davenportCardArguments = {}) {
		const { standardCard } = davenportCardArguments;
		this.#standardCard = standardCard;

		let card = `<span>${this.#standardCard.rank.abbreviation.toUpperCase()}&#${DavenportCard.cardMapping.get(this.#standardCard.suit.abbreviation)};</span>`;
		card = `${card}<span>&#${DavenportCard.cardMapping.get(this.#standardCard.suit.abbreviation)};</span>`;
		card = `${card}<span>${this.#standardCard.rank.abbreviation.toUpperCase()}&#${DavenportCard.cardMapping.get(this.#standardCard.suit.abbreviation)};</span>`;
		const dom = document.createElement('span');
		dom.classList.add('card', this.#standardCard.suit.name);
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