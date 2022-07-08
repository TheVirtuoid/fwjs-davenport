import styles from "../css/fwjs-davenport.pcss";

import Game from "../../classes/Game/Game.js";
import Player from "../../classes/Player/Player.js";
import DavenportCard from "./DavenportCard.js";
import DavenportPlayer from "./DavenportPlayer";
import {StandardCard, StandardCardRanks, StandardCardSuits} from "@virtuoid/standard-card";
import MovingCard from "./MovingCard.js";
import GameState from "./GameState.js";

const players = [];
players.push(new Player({ id: 'You', human: true }));
players.push(new Player({ id: 'Waldo', avatar: 'img/waldo.webp' }));
players.push(new Player({ id: 'Clarice', avatar: 'img/clarice.webp'  }));
players.push(new Player({ id: 'Bert', avatar: 'img/bert.webp' }));

const davenportPlayers = players.map((player) => new DavenportPlayer(player));

const dealer = players[0];

const buttonStartRound = document.getElementById('start-round');
const buttonLockCards = document.getElementById('lock-cards');
const buttonRevealCards = document.getElementById('reveal-cards');
const buttonDrawCards = document.getElementById('draw-cards');

/*
const callbacks = {
	roundStart: (round) => {
		return new Promise((resolve, reject) => {
			addToResults(`\n\nROUND ${round.roundNumber}`);
			buttonStartRound.addEventListener('click', () => {
				buttonStartRound.classList.add('inactive');
				buttonRevealCards.classList.remove('inactive');
				resolve(round);
			}, { once: true });
		});
	},
	beforeLockedCards: (round) => {
		players.forEach((player) => {
			updateLockedCards(player);
		});
		return new Promise((resolve, reject) => {
			buttonRevealCards.addEventListener('click', () => {
				buttonRevealCards.classList.add('inactive');
				buttonDrawCards.classList.remove('inactive');
				resolve(round);
			}, { once: true });
		});
	},
	afterLockedCards: (round) => {
		const lockedCards = players.map((player) => {
			return `(${player.id})${player.lockedCard.clone().toString()}`;
		});
		players.forEach((player) => {
			updateLockedCards(player);
		});
		addToResults(lockedCards.join(', '));
	},
	afterDetermineWinner: (round) => {
		if (round.winners.length > 1) {
			addToResults(`TIE: No winners this round!`);
		} else if (round.winners.length === 1) {
			addToResults(`WINNER: ${round.winners[0].id}`);
		} else {
			addToResults(`WHOOPS! We got an error!`);
		}
	},
	beforeReplaceCards: (round) => {
		players.forEach((player) => {
			updateCards(player);
		});
		return new Promise((resolve, reject) => {
			buttonDrawCards.addEventListener('click', () => {
				buttonDrawCards.classList.add('inactive');
				buttonStartRound.classList.remove('inactive');
				resolve(round);
			}, { once: true });
		});
	},
	roundEnd: (round) => {
		return new Promise((resolve, reject) => {
			addToResults('Cards after this round:');
			players.forEach((player) => {
				const cards = player.deck.getCards().map((card) => card.toString());
				addToResults(`   ${player.id}\t${cards.join(', ')}`);
			});
			if (round.gameOver) {
				addToResults('GAME IS OVER!!!');
			}
			players.forEach((player) => {
				updateCards(player);
				clearLockedCards(player);
			});
			buttonDrawCards.classList.add('inactive');
			buttonStartRound.classList.remove('inactive');
			resolve(round);
		});
	}
}
*/

/*
const ul = document.getElementById('players');
players.forEach((player, index) => {
	const hand = document.querySelector(`.player${index}`);
	const lockedCard = document.querySelector(`.player${index}-locked`);
	player.deck.getCards().forEach((card) => {
		const davenportCard = new DavenportCard({ standardCard: card });
		hand.appendChild(davenportCard.dom);
	});
});
*/
const callbacks = {};

const results = document.getElementById('results');
const addToResults = (text) => {
	results.textContent = `${results.textContent}\n${text}`;
};

/*
const constructPlayer = (player, playerIndex) => {
	const li = document.createElement('li');
	let span = document.createElement('span');
	//span.textContent = player.id;
	li.appendChild(span);
	span = document.createElement('span');
	span.classList.add('card-listing', Math.floor(playerIndex / 2) === playerIndex / 2 ? 'horizontal' : 'vertical');
	span.id = `${player.id}-cards`;
	li.appendChild(span);
	span = document.createElement('span');
	span.id = `${player.id}-locked-card`;
	li.appendChild(span);
	return li;
};
*/

const updateCards = (player) => {
	const cardsDom = document.getElementById(`${player.id}-cards`);
	while (cardsDom.firstChild) {
		cardsDom.removeChild(cardsDom.firstChild);
	}
	player.deck.getCards().forEach((card) => {
		const davenportCard = new DavenportCard({ standardCard: card });
		cardsDom.appendChild(davenportCard.dom);
	});
};

const clearLockedCards = (player) => {
	const dom = document.getElementById(`${player.id}-locked-card`);
	while (dom.firstChild) {
		dom.removeChild(dom.firstChild);
	}
}

const updateLockedCards = (player) => {
	const dom = document.getElementById(`${player.id}-locked-card`);
	while (dom.firstChild) {
		dom.removeChild(dom.firstChild);
	}
	const davenportCard = player.lockedCard ?
			new DavenportCard({ standardCard: player.lockedCard }) :
			new DavenportCard({ standardCard: null });
	dom.appendChild(davenportCard.dom);
}

/*
const callbackRoundStart = async () => {};
const callbackBeforeLockedCards = async () => {};
const callbackAfterLockedCards = async () => {};
const callbackBeforeDetermineWinner = async () => {};
const callbackAfterDetermineWinner = async () => {};
const callbackBeforeReplaceCards = async () => {};
const callbackAfterReplaceCards = async () => {};
const callbackRoundEnd  = async () => {
	console.log('round end');
};

const callbacks = {
	roundStart: callbackRoundStart,
	beforeLockedCards: callbackBeforeLockedCards,
	afterLockedCards: callbackAfterLockedCards,
	beforeDetermineWinner: callbackBeforeDetermineWinner,
	afterDetermineWinner: callbackAfterDetermineWinner,
	beforeReplaceCards: callbackBeforeReplaceCards,
	afterReplaceCards: callbackAfterReplaceCards,
	roundEnd: callbackRoundEnd
};*/




const initializePlayingField = (davenportPlayers) => {
	const cardLists = new Map();
	const opponentList = document.getElementById('opponent-list');
	const battleField = document.createElement('div');
	battleField.classList.add('battle-field');
	battleField.insertAdjacentHTML('afterbegin', `<div class="locked-card discard-deck"><span class="name"></span><span class="card back"></span></div>`);
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
	return cardLists;
}

const game = new Game({ players });
game.initialize({ dealer, callbacks });
const cardLists = initializePlayingField(davenportPlayers);

/*
const playerUL = document.getElementById('players');
players.forEach((player, playerIndex) => {
	playerUL.appendChild(constructPlayer(player, playerIndex));
	updateCards(player);
});


game.start()
.then(() => {
	console.log('the end');
})
*/

const startNewGame = () => {
	buttonNewGame.classList.add('hidden');
	initialDeal();
}

const discardDeck = document.querySelector('.battle-field .discard-deck .card').getBoundingClientRect();

const movingCard = new MovingCard({
	timing: { duration: 250, iterations: 1 }
});

let gameState = GameState.NEWGAME;
const buttonNewGame = document.getElementById('new-game');
buttonNewGame.addEventListener('click', startNewGame, { once: true });



const dealCard = (davenportPlayer, index = -1) => {
	return new Promise((resolve, reject) => {
		const destination = davenportPlayer.player.id;
		const deck = cardLists.get(destination);
		const empty = deck.querySelector('.card.blank');
		const emptyClientRect = empty.getBoundingClientRect();
		const movement = {
			from: [ discardDeck.left, discardDeck.top ],
			to: [ emptyClientRect.left, emptyClientRect.top]
		};
		movingCard.move(movement)
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

let index = 0;

const dealEveryone = async () => {
	for(let i = 0, l = davenportPlayers.length; i < l; i++) {
		await dealCard(davenportPlayers[i], index);
	}
	index++;
}

const initialDeal = () => {
	dealEveryone()
			.then(dealEveryone)
			.then(dealEveryone)
			.then(dealEveryone)
			.then(dealEveryone);
}

