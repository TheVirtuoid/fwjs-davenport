import Player from "../../classes/Player/Player.js";
import { playersConfig } from "./davenportConfig.js";
import DavenportPlayer from "./DavenportPlayer.js";
import DavenportField from "./DavenportField.js";
import Game from "../../classes/Game/Game.js";
import DavenportController from "./DavenportController.js";
import GameState from "./GameState.js";

export default class DavenportGame {

	#players = new Map();
	#dealer;
	#field;
	#game;
	#dom = new Map();
	#callbacks;

	constructor() {
		playersConfig.forEach((playerCredentials) => {
			const player = new Player(playerCredentials);
			this.#players.set(playerCredentials.id, new DavenportPlayer(player));
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
		return new Promise((resolve, reject) => {
			setStatus(`<span>Select your card within 30 seconds</span>`);
			setTimeout(() => {
				/*setStatus();*/
				resolve(round);
			}, 2000);
		});

	};
	#callbackAfterLockedCards (round) {
		const setStatus = this.#setStatus.bind(this);
		return new Promise((resolve, reject) => {
			setStatus(`<span>AfterLockedCards ${round.roundNumber}</span>`);
			setTimeout(() => {
				setStatus();
				resolve(round);
			}, 2000);
		});
	};
	#callbackBeforeDetermineWinner (round) {
		const setStatus = this.#setStatus.bind(this);
		return new Promise((resolve, reject) => {
			setStatus(`<span>BeforeDetermineWinner ${round.roundNumber}</span>`);
			setTimeout(() => {
				setStatus();
				resolve(round);
			}, 2000);
		});
	};
	#callbackAfterDetermineWinner (round) {
		const setStatus = this.#setStatus.bind(this);
		return new Promise((resolve, reject) => {
			setStatus(`<span>AfterDetermineWinner ${round.roundNumber}</span>`);
			setTimeout(() => {
				setStatus();
				resolve(round);
			}, 2000);
		});
	};
	#callbackBeforeReplaceCards (round) {
		const setStatus = this.#setStatus.bind(this);
		return new Promise((resolve, reject) => {
			setStatus(`<span>BeforeReplaceCards ${round.roundNumber}</span>`);
			setTimeout(() => {
				setStatus();
				resolve(round);
			}, 2000);
		});
	};
	#callbackAfterReplaceCards (round) {
		const setStatus = this.#setStatus.bind(this);
		return new Promise((resolve, reject) => {
			setStatus(`<span>AfterReplaceCards ${round.roundNumber}</span>`);
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