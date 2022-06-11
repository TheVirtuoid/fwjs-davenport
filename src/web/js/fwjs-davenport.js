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

const ul = document.getElementById('players');
players.forEach((player, index) => {
	const hand = document.querySelector(`.player${index}`);
	const lockedCard = document.querySelector(`.player${index}-locked`);
	player.deck.getCards().forEach((card) => {
		const davenportCard = new DavenportCard({ standardCard: card });
		hand.appendChild(davenportCard.dom);
	});

/*
	const li = document.createElement('li');
	const span = document.createElement('span');
	span.textContent = `${player.id}: `;
	li.appendChild(span);
	player.deck.getCards().forEach((card) => {
		const davenportCard = new DavenportCard({ standardCard: card });
		li.appendChild(davenportCard.dom);
	});
	ul.appendChild(li);
*/
});

const results = document.getElementById('results');
const addToResults = (text) => {
	results.textContent = `${results.textContent}\n${text}`;
};

import imgUrl from './../img/cards/sa.svg';
document.getElementById('card-img').src = imgUrl;

game.start()
.then(() => {
	console.log('the end');
})