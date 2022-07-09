import DavenportCard from "./DavenportCard.js";
import MovingCard from "./MovingCard.js";
import { animationTimingConfig } from "./davenportConfig.js";

export default class DavenportField {

	#dom;
	#movingCard;

	constructor() {
		this.#dom = new Map();
		this.#dom.set('davenport', document.getElementById('davenport'));
		this.#dom.set('playing-field', document.getElementById('playing-field'));
		this.#dom.set('opponent-list', document.getElementById('opponent-list'));
		this.#dom.set('actions', document.getElementById('actions'));
		this.#dom.set('new-game', document.querySelector('#actions div.new-game'));
		this.#movingCard = new MovingCard({ timing: animationTimingConfig });
	}

	dom(elementName) {
		return this.#dom.get(elementName);
	}

	initialize(parameters = {}) {
		const { davenportPlayers } = parameters;
		const cardLists = new Map();
		const opponentList = this.dom('opponent-list');
		const battleField = document.createElement('div');
		battleField.classList.add('battle-field');
		battleField.appendChild(DavenportCard.discardDeckCard);
		this.#dom.set('discard-deck',  battleField.querySelector('.discard-deck .card'))
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

	initialDeal(davenportPlayers) {
		const dealEveryone = this.#dealEveryone.bind(this);
		let cardIndex = 0;
		return new Promise((resolve, reject) => {
			dealEveryone({ davenportPlayers, cardIndex })
					.then(dealEveryone)
					.then(dealEveryone)
					.then(dealEveryone)
					.then(dealEveryone)
					.then(resolve)
		});
	}

	async #dealEveryone(dealEveryoneArguments) {
		let { davenportPlayers, cardIndex } = dealEveryoneArguments;
		for(let i = 0, l = davenportPlayers.length; i < l; i++) {
			const player = davenportPlayers[i].player;
			const card = player.human ? new DavenportCard({ standardCard: player.deck.getCards()[cardIndex], faceUp: true }) : null;
			await davenportPlayers[i].drawCard(this.dom('discard-deck'), card);
		}
		cardIndex++;
		return { davenportPlayers, cardIndex };
	}



	/*#playLockedCard(davenportPlayer, index = -1) {
		const destination = davenportPlayer.player.id;
		const playerCardList = this.dom('cardLists').get(destination);
		const allCards = [...playerCardList.querySelectorAll('.card')];
		const battleCardRect = davenportPlayer.lockedCardDom.getBoundingClientRect();
		const domSource = davenportPlayer.human ? allCards[index] : allCards[allCards.length - 1];
		const domSourceRect = domSource.getBoundingClientRect();
		const movement = {
			from: [ domSourceRect.left, domSourceRect.top ],
			to: [ battleCardRect.left, battleCardRect.top]
		};
		return this.#dealCard({ movement, domDestination: davenportPlayer.lockedCardDom, source: davenportCard })
	}*/

	/*#dealFromDiscardDeck(davenportPlayer, index = -1) {
		const destination = davenportPlayer.player.id;
		const playerCardList = this.#dom.get('cardLists').get(destination);
		const firstEmptyCard = playerCardList.querySelector('.card.blank');
		const emptyClientRect = firstEmptyCard.getBoundingClientRect();
		const discardDeckRect = this.#dom.get('discard-deck').getBoundingClientRect();
		let davenportCard;
		if (davenportPlayer.player.human && index !== -1) {
			const playerDeck = davenportPlayer.player.deck.getCards();
			const standardCard = playerDeck[index];
			davenportCard = new DavenportCard({ standardCard, faceUp: true });
		} else {
			davenportCard = new DavenportCard({ faceUp: false });
		}
		const movement = {
			from: [ discardDeckRect.left, discardDeckRect.top ],
			to: [ emptyClientRect.left, emptyClientRect.top]
		};
		return this.#dealCard({ movement, domDestination: firstEmptyCard, source: davenportCard })
	}*/

	/*#dealCard(parameters = {}) {
		const { movement, domDestination, source } = parameters;
		const self = this;
		return new Promise((resolve, reject) => {
			self.#movingCard.move(movement)
					.then(() => {
						domDestination.classList.remove('blank');
						if (source.revealed) {
							domDestination.innerHTML = source.dom.innerHTML;
							domDestination.classList.add(source.suit.name);
						} else {
							domDestination.classList.add('back');
						}
						resolve();
					});
		});
	}*/


	/*
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
*/

	/*

		#dom = new Map();
		#movingCard;

		constructor() {
			this.#dom.set('davenport', document.getElementById('davenport'));
			this.#dom.set('playing-field', document.getElementById('playing-field'));
			this.#dom.set('opponent-list', document.getElementById('opponent-list'));
			this.#dom.set('actions', document.getElementById('actions'));
			this.#dom.set('new-game', document.querySelector('#actions div.new-game'));
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
			let cardIndex = 0;
			this.#dealEveryone.bind(this)({ davenportPlayers, cardIndex })
					.then(this.#dealEveryone.bind(this))
					.then(this.#dealEveryone.bind(this))
					.then(this.#dealEveryone.bind(this))
					.then(this.#dealEveryone.bind(this));
		}

		async #dealEveryone(dealEveryoneArguments) {
			let { davenportPlayers, cardIndex } = dealEveryoneArguments;
			for(let i = 0, l = davenportPlayers.length; i < l; i++) {
				await this.#dealCard(davenportPlayers[i], cardIndex);
			}
			cardIndex++;
			return { davenportPlayers, cardIndex };
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

		updateStatus(text) {

		}
	*/
}