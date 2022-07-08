import styles from "../css/fwjs-davenport.pcss";

import Game from "../../classes/Game/Game.js";
import Player from "../../classes/Player/Player.js";
import DavenportCard from "./DavenportCard.js";
import DavenportPlayer from "./DavenportPlayer";
import {StandardCard, StandardCardRanks, StandardCardSuits} from "@virtuoid/standard-card";
import MovingCard from "./MovingCard.js";
import GameState from "./GameState.js";

import DavenportGame from "./DavenportGame.js";

const davenportGame = new DavenportGame();
davenportGame.initialize();
davenportGame.start();

/*
const discardDeck = document.querySelector('.battle-field .discard-deck .card').getBoundingClientRect();


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

*/
