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
		}
	}
}