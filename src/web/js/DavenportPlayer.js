import DavenportCard from "./DavenportCard.js";
import MovingCard from "./MovingCard.js";

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
			dataDiv.insertAdjacentHTML('afterBegin', `<span class="name">${player.id}</span>`)
			dataDiv.insertAdjacentHTML('afterbegin', `<img src="${player.avatar}" alt="Opponent ${player.id}" class="avatar"/>`);
			dom.appendChild(dataDiv);
		}
		dom.setAttribute('data-id', player.id);
		const cardDivs = document.createElement('div');
		cardDivs.classList.add('card-list');
		for(let i = 0; i < 5; i++) {
			cardDivs.insertAdjacentHTML('afterbegin', `<span class="card blank"></span>`);
		}
		dom.appendChild(cardDivs);
		this.#dom = dom;
		this.#cardList = cardDivs;

		const lockedCardDom = document.createElement('div');
		lockedCardDom.classList.add('locked-card');
		lockedCardDom.insertAdjacentHTML('afterbegin', `<span class="name">${player.id}</span><span class="card outline"></span>`);
		this.#lockedCardDom = lockedCardDom;
		this.#lockedCardDomCard = lockedCardDom.querySelector('.card');
		this.#movingCard = new MovingCard();

		this.#cardList.addEventListener('click', () => {
			this.playCard(4);
		});
	}

	get dom() {
		return this.#dom;
	}

	get player() {
		return this.#player;
	}

	get lockedCardDom() {
		return this.#lockedCardDom;
	}

	playCard(index) {
		const playerDeck = this.#player.deck.getCards();
		const standardCard = playerDeck[index];
		const davenportCard = new DavenportCard({ standardCard });
		if (this.#player.human) {
			this.#movingCard.faceUp();
		} else {
			this.#movingCard.faceDown();
		}
		const cardToMove = this.#cardList.querySelector(`.card:nth-child(${index+1})`);
		const cardPosition = cardToMove.getBoundingClientRect();
		const lockedCardPosition = this.#lockedCardDomCard.getBoundingClientRect();
		const self = this;

		const movement = {
			from: [cardPosition.left, cardPosition.top],
			to: [lockedCardPosition.left, lockedCardPosition.top]
		}
		cardToMove.classList.add('hidden');
		this.#movingCard.move(movement)
				.then(() => {
					self.#lockedCardDomCard.classList.remove('outline');
					if (!self.#player.human) {
						self.#lockedCardDomCard.classList.add('back');
					}
					// self.#lockedCardDomCard.innerHTML = davenportCard.dom.innerHTML;
				});
	}
}