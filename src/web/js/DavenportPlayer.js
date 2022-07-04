export default class DavenportPlayer {
	#player;
	#dom;
	#lockedCardDom;

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

		const lockedCardDom = document.createElement('div');
		lockedCardDom.classList.add('locked-card');
		lockedCardDom.insertAdjacentHTML('afterbegin', `<span class="name">${player.id}</span><span class="card outline"></span>`);
		this.#lockedCardDom = lockedCardDom;
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

	playCard() {
		const movingCard =
	}
}