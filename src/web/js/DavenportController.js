import GameState from "./GameState.js";
import DavenportCard from "./DavenportCard.js";

export default class DavenportController {
/*
	#state;
	#domNewGame;
	#domList;
	#domActions;


	constructor(domActions) {
		this.#domActions = domActions;
		this.#domNewGame = domActions.querySelector('.new-game');
		this.#domList = [this.#domNewGame];
		this.#state = GameState.NONE;
	}

	changeToState(state) {
		if (GameState.LIST.indexOf(state) === -1) {
			return;
		}
		this.#state = state;
		switch(state) {
			case GameState.NEWGAME:
				this.#domNewGame.addEventListener('click', this.#newGame.bind(this), { once: true });
				this.#activate(this.#domNewGame);
				break;
			case GameState.INITIALDEAL:
				break;
			case GameState.INPROGRESS:
				break;
			case GameState.GAMEOVER:
				break;
			case GameState.INITIALIZE:
				break;
		}
		this.#domActions.dispatchEvent(new CustomEvent('state-change', { detail: { state: this.#state } }));
	}

	#activate(dom) {
		this.#domList.forEach((element) => {
			element !== dom ? element.classList.add('hidden') : element.classList.remove('hidden');
		});
	}

	#newGame() {
		this.#activate(null);
		this.changeToState(GameState.INITIALDEAL);
	}

*/
}