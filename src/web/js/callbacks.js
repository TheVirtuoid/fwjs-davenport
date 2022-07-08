const roundStart = (round) => {
	return new Promise((resolve, reject) => {
		addToResults(`\n\nROUND ${round.roundNumber}`);
		buttonStartRound.addEventListener('click', () => {
			buttonStartRound.classList.add('inactive');
			buttonRevealCards.classList.remove('inactive');
			resolve(round);
		}, { once: true });
	});
}

export { roundStart };