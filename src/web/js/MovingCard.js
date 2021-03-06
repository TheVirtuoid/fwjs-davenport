import DavenportCard from "./DavenportCard.js";

export default class MovingCard {
	#card;
	#timing;
	#sound;

	constructor(movingCardArguments = {}) {
		const { timing = { duration: 250, iterations: 1 } } = movingCardArguments;

		this.#sound = new Audio('audio/card-deal.wav');
		const newCard = new DavenportCard();
		newCard.dom.classList.add('movable', 'hidden');
		newCard.dom.style.top = `0px`;
		newCard.dom.style.left = `0px`;
		this.#card = newCard;
		this.#timing = timing;
		this.faceDown();
		document.body.appendChild(newCard.dom);
	}

	faceDown() {
		this.#card.faceDown();
	}

	faceUp() {
		this.#card.faceUp();
	}

	get dom() {
		return this.#card.dom;
	}

	move(movementParameters) {
		return new Promise((resolve, reject) => {
			const { from, to, timing = this.#timing } = movementParameters;
			const [ fromX, fromY ] = from;
			const [ toX, toY ] = to;
			const animation = [
				{ transform: `translate(${fromX}px, ${fromY}px)` },
				{ transform: `translate(${toX}px, ${toY}px) rotateZ(180deg)` }
			];
			const dom = this.#card.dom;
			dom.classList.remove('hidden');
			const animate = dom.animate(animation, timing);
			this.#sound.play();
			animate.addEventListener('finish', () => {
				dom.classList.add('hidden');
				resolve();
			}, { once: true })
		});
	}
}