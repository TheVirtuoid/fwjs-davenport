import Player from "../../classes/Player/Player.js";
import { playersConfig } from "./davenportConfig.js";
import DavenportPlayer from "./DavenportPlayer.js";
import DavenportField from "./DavenportField.js";
import Game from "../../classes/Game/Game.js";
import DavenportController from "./DavenportController.js";
import GameState from "./GameState.js";
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
			afterReplaceCards: this.#callbackAfterReplaceCards.bind(this),
			roundEnd: this.#callbackRoundEnd.bind(this)
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

		/*document.getElementById('go').addEventListener('click', () => {
			const domCard = this.#field.dom('discard-deck');
			this.#players.get('Waldo').drawCard(domCard);
		});*/
	}

	start() {
		this.dom('new-game').addEventListener('click', this.#startNewGame.bind(this), { once: true });
	}

	dom(elementName) {
		return this.#dom.get(elementName);
	}

	#startNewGame() {
		const setStatus = this.#setStatus.bind(this);
		const gameStart = this.#game.start.bind(this.#game);
		setStatus();
		this.#field.initialDeal([...this.#players.values()])
				.then(() => gameStart())
				.then(() => {
					setStatus('Game Over');
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
			setStatus(`<span>Choose your card n 30 seconds</span>`);
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
			setStatus(`<span>BeforeDetermineWinner ${round.roundNumber}</span>`);
			const allAiPlayers = [...this.#aiPlayers.values()];
			for(let i = 0, l = allAiPlayers.length; i < l; i++) {
				const player = allAiPlayers[i];
				await player.flipLockedCard.bind(player)();
			}
			setTimeout(() => {
				setStatus();
				resolve(round);
			}, 2000);
		});
	};
	#callbackAfterDetermineWinner (round) {
		const setStatus = this.#setStatus.bind(this);
		return new Promise((resolve, reject) => {
			console.log(round);
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
			// setStatus(`<span>BeforeReplaceCards ${round.roundNumber}</span>`);
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
				console.log(player.id, player.deck.getCards());
				if (player !== winner) {
					const card = player.human ?
							new DavenportCard({ standardCard: player.deck.getCards()[player.deck.cardCount - 1], faceUp: true }) : null;
					await davenportPlayer.drawCard(domDiscardDeck, card);
				}
			}
			setTimeout(() => {
				setStatus();
				resolve(round);
			}, 2000);
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





	/*
		#players = new Map();
		#dealer;
		#field;
		#controller;
		#game;

		constructor() {
			playersConfig.forEach((playerCredentials) => {
				const player = new Player(playerCredentials);
				this.#players.set(playerCredentials.id, new DavenportPlayer(player));
			});
			this.#dealer = [...this.#players.values()][0].player;
			this.#field = new DavenportField();
			this.#game = new Game({ players: [...this.#players.values()].map((davenportPlayer) => davenportPlayer.player) });
			this.dom('actions').addEventListener('state-change', this.#gameStateChange.bind(this));
			this.#controller = new DavenportController(this.dom('actions'));
		}

		initialize() {
			const callbacks = {};
			this.#field.initialize({ davenportPlayers: [...this.#players.values()] });
			this.#game.initialize({ dealer: this.#dealer, callbacks });
		}

		start() {
			this.#controller.changeToState(GameState.NEWGAME);
		}

		dom(nodeName) {
			return this.#field.dom.get(nodeName);
		}

		#gameStateChange(event) {
			const { state } = event.detail;
			switch(state) {
				case GameState.NEWGAME:
					break;
				case GameState.INPROGRESS:
					break;
				case GameState.GAMEOVER:
					break;
				case GameState.INITIALDEAL:
					this.#field.initialDeal([...this.#players.values()]);
					break;
				case GameState.NONE:
					break;
			}
		}
	*/
}