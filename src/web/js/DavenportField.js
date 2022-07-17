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
}