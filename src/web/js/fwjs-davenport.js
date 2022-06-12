import styles from "../css/fwjs-davenport.pcss";

import Game from "../../classes/Game/Game.js";
import Player from "../../classes/Player/Player.js";
import DavenportCard from "./DavenportCard.js";

const players = [];
players.push(new Player({ id: 'Human', human: false }));
players.push(new Player({ id: 'Saitama' }));
players.push(new Player({ id: 'Rick S.' }));
players.push(new Player({ id: 'Phineas'}));

const dealer = players[0];

const buttonStartRound = document.getElementById('start-round');
const buttonLockCards = document.getElementById('lock-cards');
const buttonRevealCards = document.getElementById('reveal-cards');
const buttonDrawCards = document.getElementById('draw-cards');

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

const results = document.getElementById('results');
const addToResults = (text) => {
	results.textContent = `${results.textContent}\n${text}`;
};

const constructPlayer = (player) => {
	const li = document.createElement('li');
	let span = document.createElement('span');
	span.textContent = player.id;
	li.appendChild(span);
	span = document.createElement('span');
	span.classList.add('card-listing');
	span.id = `${player.id}-cards`;
	li.appendChild(span);
	span = document.createElement('span');
	span.id = `${player.id}-locked-card`;
	li.appendChild(span);
	return li;
};

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

/*const callbacks = {
	roundStart: callbackRoundStart,
	beforeLockedCards: callbackBeforeLockedCards,
	afterLockedCards: callbackAfterLockedCards,
	beforeDetermineWinner: callbackBeforeDetermineWinner,
	afterDetermineWinner: callbackAfterDetermineWinner,
	beforeReplaceCards: callbackBeforeReplaceCards,
	afterReplaceCards: callbackAfterReplaceCards,
	roundEnd: callbackRoundEnd
};*/

const game = new Game({ players });
game.initialize({ dealer, callbacks });

const playerUL = document.getElementById('players');
players.forEach((player) => {
	playerUL.appendChild(constructPlayer(player));
	updateCards(player);
});


game.start()
.then(() => {
	console.log('the end');
})