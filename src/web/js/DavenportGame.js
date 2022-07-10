import Player from "../../classes/Player/Player.js";
import { playersConfig } from "./davenportConfig.js";
import DavenportPlayer from "./DavenportPlayer.js";
import DavenportField from "./DavenportField.js";
import Game from "../../classes/Game/Game.js";
import DavenportCard from "./DavenportCard.js";

export default class DavenportGame {

	#players = new Map();
	#aiPlayers = new Map();
	#humanPlayer;
	#dealer;
	#field;
	#game;
	#dom = new Map();
	#callbacks;

	constructor() {
		playersConfig.forEach((playerCredentials) => {
			const player = new Player(playerCredentials);
			const davenportPlayer = new DavenportPlayer(player);
			this.#players.set(playerCredentials.id, davenportPlayer);
			if (!player.human) {
				this.#aiPlayers.set(playerCredentials.id, davenportPlayer);
			} else {
				this.#humanPlayer = davenportPlayer;
			}
		});
		this.#dealer = [...this.#players.values()][0].player;
		this.#field = new DavenportField();
		this.#game = new Game({ players: [...this.#players.values()].map((davenportPlayer) => davenportPlayer.player) });
		this.#callbacks = {
			roundStart: this.#callbackRoundStart.bind(this),
			beforeLockedCards: this.#callbackBeforeLockedCards.bind(this),
			afterLockedCards: this.#callbackAfterLockedCards.bind(this),
			beforeDetermineWinner: this.#callbackBeforeDetermineWinner.bind(this),
			afterDetermineWinner: this.#callbackAfterDetermineWinner.bind(this),
			beforeReplaceCards: this.#callbackBeforeReplaceCards.bind(this),
			afterReplaceCards: this.#callbackAfterReplaceCards.bind(this)
			// roundEnd: this.#callbackRoundEnd.bind(this)
		};

	}

	initialize() {
		this.#field.initialize({ davenportPlayers: this.#players });
		this.#dom.set('status', document.getElementById('status'));
		const domStatus = this.dom('status');
		this.#clearElement(domStatus);
		const domNewGame = document.createElement('button');
		domNewGame.textContent = "New Game";
		domNewGame.classList.add('new-game');
		domStatus.appendChild(domNewGame);
		this.#dom.set('new-game', domNewGame);
		this.#game.initialize({ dealer: this.#dealer, callbacks: this.#callbacks });

	}

	start() {
		this.dom('new-game').addEventListener('click', this.#startNewGame.bind(this), { once: true });
	}

	dom(elementName) {
		return this.#dom.get(elementName);
	}

	#startNewGame() {
		const setStatus = this.#setStatus.bind(this);
		const game = this.#game;
		const gameStart = game.start.bind(game);
		const players = [...this.#players.values()];
		setStatus();
		this.#field.initialDeal(players)
				.then(() => gameStart())
				.then(() => {
					if (game.error) {
						setStatus(`Game Over: ${game.error.exception.message}`);
					} else {
						const davenportPlayer = players.find((davenportPlayer) => davenportPlayer.player.id === game.winner.id);
						davenportPlayer.cardList.insertAdjacentHTML('afterbegin', '<span class="winner">WINNER</span>');
						setStatus(`Game Over: Winner is ${game.winner.id}`);
					}
				});
	}

	#clearElement(element) {
		while(element.firstChild) element.removeChild(element.firstChild);
	}

	#callbackRoundStart (round) {
		const setStatus = this.#setStatus.bind(this);
		return new Promise((resolve, reject) => {
			setStatus(`<span>Round ${round.roundNumber}</span>`);
			setTimeout(() => {
				setStatus();
				resolve(round);
			}, 2000);
		});
	};

	#callbackBeforeLockedCards (round) {
		const setStatus = this.#setStatus.bind(this);
		const self = this;
		return new Promise(async (resolve, reject) => {
			const allAiPlayers = [...self.#aiPlayers.values()];
			for(let i = 0, l = allAiPlayers.length; i < l; i++) {
				const player = allAiPlayers[i];
				await player.playCard.bind(player)(-1);
			}
			setStatus(`<span>Choose your card in 30 seconds</span>`);
			self.#humanPlayer.activateLockedCardSelection();
			resolve(round);
		});

	};
	#callbackAfterLockedCards (round) {
		const setStatus = this.#setStatus.bind(this);
		return new Promise((resolve, reject) => {
			setStatus(`<span>Cards are locked!</span>`);
			setTimeout(() => {
				setStatus();
				resolve(round);
			}, 2000);
		});
	};
	#callbackBeforeDetermineWinner (round) {
		const setStatus = this.#setStatus.bind(this);
		return new Promise(async (resolve, reject) => {
			const allAiPlayers = [...this.#aiPlayers.values()];
			for(let i = 0, l = allAiPlayers.length; i < l; i++) {
				const player = allAiPlayers[i];
				await player.flipLockedCard.bind(player)();
			}
			setTimeout(() => {
				setStatus();
				resolve(round);
			}, 500);
		});
	};
	#callbackAfterDetermineWinner (round) {
		const setStatus = this.#setStatus.bind(this);
		return new Promise((resolve, reject) => {
			if (round.winners.length === 1) {
				const davenportWinner = [...this.#players.values()].find((player) => player.player === round.winners[0]);
				setStatus(`<span>WINNER! ${davenportWinner.player.id}</span>`);
				davenportWinner.lockedCardDomCard.classList.add('winner');
			} else {
				setStatus(`<span>TIE GAME!</span>`);
			}
			setTimeout(() => {
				setStatus();
				resolve(round);
			}, 2000);
		});
	};
	#callbackBeforeReplaceCards (round) {
		const setStatus = this.#setStatus.bind(this);
		const domDiscardDeck = this.#field.dom('discard-deck');
		return new Promise(async (resolve, reject) => {
			const allPlayers = [...this.#players.values()];
			for(let i = 0, l = allPlayers.length; i < l; i++) {
				await allPlayers[i].player.removeLockedCard();
				await allPlayers[i].discardCard(domDiscardDeck);
			}
			setTimeout(() => {
				setStatus();
				resolve(round);
			}, 2000);
		});
	};
	#callbackAfterReplaceCards (round) {
		const setStatus = this.#setStatus.bind(this);
		const domDiscardDeck = this.#field.dom('discard-deck');
		return new Promise(async (resolve, reject) => {
			const winner = round.winners.length === 1 ? round.winners[0] : null;
			const allPlayers = [...this.#players.values()];
			for(let i = 0, l = allPlayers.length; i < l; i++) {
				const davenportPlayer = allPlayers[i];
				const player = davenportPlayer.player;
				if (player !== winner) {
					const card = player.human ?
							new DavenportCard({ standardCard: player.deck.getCards()[player.deck.cardCount - 1], faceUp: true }) : null;
					await davenportPlayer.drawCard(domDiscardDeck, card);
				}
			}
			setTimeout(() => {
				setStatus();
				resolve(round);
			}, 500);
		});
	};
	#callbackRoundEnd (round) {
		const setStatus = this.#setStatus.bind(this);
		return new Promise((resolve, reject) => {
			setStatus(`<span>Round ${round.roundNumber} OVER</span>`);
			setTimeout(() => {
				setStatus();
				resolve(round);
			}, 2000);
		});
	}

	#setStatus(text = '') {
		const domStatus = this.dom('status');
		this.#clearElement(domStatus);
		if (text) {
			domStatus.insertAdjacentHTML('afterbegin', `<span>${text}</span>`);
		}
	}
}