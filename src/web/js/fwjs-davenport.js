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

const callbacks = {
	roundStart: (round) => {
		addToResults(`\n\nROUND ${round.roundNumber}`);
	},
	afterLockedCards: (round) => {
		const lockedCards = players.map((player) => {
			return `(${player.id})${player.lockedCard.clone().toString()}`;
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
	roundEnd: (round) => {
		addToResults('Cards after this round:');
		players.forEach((player) => {
			const cards = player.deck.getCards().map((card) => card.toString());
			addToResults(`   ${player.id}\t${cards.join(', ')}`);
		});
		if (round.gameOver) {
			addToResults('GAME IS OVER!!!');
		}
	}
}
const game = new Game({ players });
game.initialize({ dealer, callbacks });

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
	const cards = player.deck.getCards().map((card) => card.toString());
	player.deck.getCards().forEach((card) => {
		const davenportCard = new DavenportCard({ standardCard: card });
		cardsDom.appendChild(davenportCard.dom);
	});
};

const playerUL = document.getElementById('players');
players.forEach((player) => {
	playerUL.appendChild(constructPlayer(player));
	updateCards(player);
});

game.start()
.then(() => {
	console.log('the end');
})