import Game from "../../classes/Game/Game.js";
import Player from "../../classes/Player/Player.js";

const players = [];
players.push(new Player({ id: 'Human', human: true }));
players.push(new Player({ id: 'Saitama' }));
players.push(new Player({ id: 'Rick' }));
players.push(new Player({ id: 'Phineas '}));

const dealer = players[0];

const game = new Game({ players });
game.initialize({ dealer });

const ul = document.getElementById('players');
players.forEach((player) => {
	const li = document.createElement('li');
	let textContent = `${player.id}: `;
	const cards = player.deck.getCards().map((card) => card.toString());
	li.textContent = `${player.id}: ${cards.join(',')}`;
	ul.appendChild(li);
});