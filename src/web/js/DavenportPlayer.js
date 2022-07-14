import DavenportCard from "./DavenportCard.js";
import MovingCard from "./MovingCard.js";
import {StandardCard} from "@virtuoid/standard-card";

export default class DavenportPlayer {
	#player;
	#dom;
	#lockedCardDom;
	#cardList;
	#lockedCardDomCard;
	#movingCard;

	constructor(player) {
		this.#player = player;
		const dom = document.createElement('div');
		if (player.human) {
			dom.classList.add('player-field');
			dom.insertAdjacentHTML('afterbegin', `<span class="name">Your Cards</span>`);
		} else {
			dom.classList.add('opponent')
			const dataDiv = document.createElement('div');
			dataDiv.classList.add('data');
			dataDiv.insertAdjacentHTML('afterbegin', `<span class="name">${player.id}</span>`)
			dataDiv.insertAdjacentHTML('afterbegin', `<img src="${player.avatar}" alt="Opponent ${player.id}" class="avatar"/>`);
			dom.appendChild(dataDiv);
		}
		dom.setAttribute('data-id', player.id);
		const cardDivs = document.createElement('div');
		cardDivs.classList.add('card-list');

		dom.appendChild(cardDivs);
		this.#dom = dom;
		this.#cardList = cardDivs;

		const lockedCardDom = document.createElement('div');
		lockedCardDom.classList.add('locked-card');
		lockedCardDom.insertAdjacentHTML('afterbegin', `<span class="name">${player.id}</span><span class="card outline"></span>`);
		this.#lockedCardDom = lockedCardDom;
		this.#lockedCardDomCard = lockedCardDom.querySelector('.card');
		this.#movingCard = new MovingCard();
	}

	get dom() {
		return this.#dom;
	}

	get cardList() {
		return this.#cardList;
	}

	get player() {
		return this.#player;
	}

	get lockedCardDom() {
		return this.#lockedCardDom;
	}

	get lockedCardDomCard() {
		return this.#lockedCardDomCard;
	}

	activateLockedCardSelection() {
		this.#cardList.addEventListener('click', this.#processLockedCardClick.bind(this), { once: true });
	}

	#processLockedCardClick(event) {
		const cardSelected = event.target.parentElement.card;
		if (!(cardSelected instanceof StandardCard)) {
			this.activateLockedCardSelection();
		} else {
			const cardIndex = this.#player.deck.findCard(cardSelected);
			if (cardIndex !== -1) {
				this.playCard(cardIndex, cardSelected.suit.name)
						.then(() => {
							this.#player.setLockedCard(cardSelected);
						});
			}
		}
	}

	flipLockedCard() {
		const lockedCard = this.#lockedCardDomCard;
		const standardCard = this.#player.lockedCard;
		const animation = [
			{ transform: `rotateY(180deg)` }
		]
		const timing = { duration: 250, iterations: 1, fill: 'backwards' };
		return flipTheCard({ lockedCard, animation, timing })
				.then((parameters) => {
					const davenportCard = new DavenportCard({ standardCard, faceUp: true });
					DavenportCard.replace(lockedCard, davenportCard.dom);
					return Promise.resolve(parameters);
				});


		function flipTheCard(parameters) {
			const { lockedCard, animation, timing } = parameters;
			return new Promise((resolve) => {
				const animate = lockedCard.animate(animation, timing);
				animate.addEventListener('finish', () => {
					resolve({ lockedCard, animation, timing });
				}, { once: true })
			});
		}
	}

	drawCard(domCard, outputCard) {
		const self = this;
		this.#movingCard.faceDown();
		const cardRect = domCard.getBoundingClientRect();
		const newCard = DavenportCard.blankCard;
		this.#cardList.appendChild(newCard);
		const newCardRect = newCard.getBoundingClientRect();
		const movement = {
			from: [cardRect.left, cardRect.top],
			to: [newCardRect.left, newCardRect.top]
		}
		return new Promise((resolve) => {
			self.#movingCard.move(movement)
					.then( () => {
						DavenportCard.replace(newCard, outputCard ? outputCard.dom : domCard);
						resolve();
					});
		});
	}

	discardCard(discardDeck) {
		this.#movingCard.faceDown();
		const fromRect = this.#lockedCardDomCard.getBoundingClientRect();
		const toRect = discardDeck.getBoundingClientRect();
		/*this.#cardList.appendChild(newCard);
		const newCardRect = newCard.getBoundingClientRect();*/
		const movement = {
			from: [fromRect.left, fromRect.top],
			to: [toRect.left, toRect.top]
		}
		return new Promise((resolve) => {
			this.#lockedCardDomCard.classList.remove(...this.#lockedCardDomCard.classList);
			this.#lockedCardDomCard.classList.add('card', 'outline');
			this.#lockedCardDomCard.innerHTML = '';
			this.#movingCard.move(movement)
					.then( () => {
						// DavenportCard.replace(newCard, outputCard ? outputCard.dom : domCard);
						resolve();
					});
		});
	}

	playCard(index, cardClass = '') {
		const self = this;
		const newCard = this.#lockedCardDomCard;
		let timing = 250;
		let domCard;
		if (index === -1) {
			domCard = [...this.#cardList.querySelectorAll('.card')].at(-1);
			this.#movingCard.faceDown();
		} else {
			domCard = this.#cardList.querySelector(`.card:nth-child(${index + 1})`);
			this.#movingCard.dom.innerHTML = domCard.innerHTML;
			this.#movingCard.dom.classList.add(cardClass)
			this.#movingCard.faceUp();
		}
		const cardRect = domCard.getBoundingClientRect();
		const newCardRect = newCard.getBoundingClientRect();
		const movement = {
			from: [cardRect.left, cardRect.top],
			to: [newCardRect.left, newCardRect.top],
			timing: { duration: timing, iterations: 1 }
		}
		return new Promise((resolve) => {
			domCard.parentElement.removeChild(domCard);
			self.#movingCard.move(movement)
					.then( () => {
						if (index !== -1) {
							self.#movingCard.dom.innerHTML = '';
							self.#movingCard.dom.classList.remove(cardClass);
						}
						DavenportCard.replace(newCard, domCard);
						resolve();
					});
		});
	}
}
