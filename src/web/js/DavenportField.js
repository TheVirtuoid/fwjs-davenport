import DavenportCard from "./DavenportCard.js";
import MovingCard from "./MovingCard.js";
import { animationTimingConfig } from "./davenportConfig.js";

export default class DavenportField {

	#dom = new Map();
	#movingCard;

	constructor() {
		this.#dom.set('davenport', document.getElementById('davenport'));
		this.#dom.set('playing-field', document.getElementById('playing-field'));
		this.#dom.set('opponent-list', document.getElementById('opponent-list'));
		this.#dom.set('actions', document.getElementById('actions'));
		this.#movingCard = new MovingCard({ timing: animationTimingConfig });
	}

	get dom () {
		return this.#dom;
	}

	initialize(fieldArguments = {}) {
		const { davenportPlayers } = fieldArguments;
		this.#initializePlayingField(davenportPlayers)
	}

	initialDeal(davenportPlayers) {
		this.#dealCard(davenportPlayers[0], -1);
		/*this.#dealEveryone.bind(this)(davenportPlayers)
				.then(this.#dealEveryone.bind(this))
				.then(this.#dealEveryone.bind(this))
				.then(this.#dealEveryone.bind(this))
				.then(this.#dealEveryone.bind(this));*/
	}

	async #dealEveryone(davenportPlayers) {
		for(let i = 0, l = davenportPlayers.length; i < l; i++) {
			await this.#dealCard(davenportPlayers[i], i);
		}
	}

	#dealCard(davenportPlayer, index = -1) {
		const self = this;
		return new Promise((resolve, reject) => {
			const destination = davenportPlayer.player.id;
			const deck = self.#dom.get('cardLists').get(destination);
			const empty = deck.querySelector('.card.blank');
			const emptyClientRect = empty.getBoundingClientRect();
			const discardDeck = self.#dom.get('discard-deck').getBoundingClientRect();
			const movement = {
				from: [ discardDeck.left, discardDeck.top ],
				to: [ emptyClientRect.left, emptyClientRect.top]
			};
			self.#movingCard.move(movement)
					.then(() => {
						empty.classList.remove('blank');
						if (davenportPlayer.player.human && index !== -1) {
							const playerDeck = davenportPlayer.player.deck.getCards();
							const standardCard = playerDeck[index];
							const davenportCard = new DavenportCard({ standardCard, faceUp: true });
							empty.innerHTML = davenportCard.dom.innerHTML;
							empty.classList.add(standardCard.suit.name);
						} else {
							empty.classList.add('back');
						}
						resolve();
					});
		});
	}


	#initializePlayingField = (davenportPlayers) => {
		const cardLists = new Map();
		const opponentList = this.#dom.get('opponent-list');
		const battleField = document.createElement('div');
		battleField.classList.add('battle-field');
		battleField.appendChild(DavenportCard.discardDeckCard);
		this.#dom.set('discard-deck',  battleField.querySelector('.discard-deck .card'))
		opponentList.appendChild(battleField);
		let humanPlayer = null;
		davenportPlayers.forEach((davenportPlayer) => {
			battleField.appendChild(davenportPlayer.lockedCardDom);
			if (davenportPlayer.player.human) {
				humanPlayer = davenportPlayer;
			} else {
				opponentList.appendChild(davenportPlayer.dom);
			}
			cardLists.set(davenportPlayer.player.id, davenportPlayer.dom.querySelector('.card-list'));
		});
		opponentList.appendChild(battleField);
		opponentList.appendChild(humanPlayer.dom);
		this.#dom.set('cardLists', cardLists);
	}
}