import { StandardCardSuits, StandardCardRanks, StandardCard } from "@virtuoid/standard-card";

const valueMapping = new Map();
valueMapping.set(StandardCardRanks.ACE, 1);
valueMapping.set(StandardCardRanks.TWO, 2);
valueMapping.set(StandardCardRanks.THREE, 3);
valueMapping.set(StandardCardRanks.FOUR, 4);
valueMapping.set(StandardCardRanks.FIVE, 5);
valueMapping.set(StandardCardRanks.SIX, 6);
valueMapping.set(StandardCardRanks.SEVEN, 7);
valueMapping.set(StandardCardRanks.EIGHT, 8);
valueMapping.set(StandardCardRanks.NINE, 9);
valueMapping.set(StandardCardRanks.TEN, 10);
valueMapping.set(StandardCardRanks.JACK, 11);
valueMapping.set(StandardCardRanks.QUEEN, 12);
valueMapping.set(StandardCardRanks.KING, 13);

const standardCardDeck = [];
const standardCardDeckCopy = [];
StandardCardSuits.LIST.forEach((suit) => {
	StandardCardRanks.LIST.forEach((rank) => {
		standardCardDeck.push(new StandardCard({ suit, rank, value: valueMapping.get(rank) }));
		standardCardDeckCopy.push(new StandardCard({ suit, rank, value: valueMapping.get(rank) }));
	});
});

const copyDeck = (cards) => {
	return cards.map((card) => {
		new StandardCard({ suit: card.suit, rank: card.rank, value: card.value });
	});
};

export { standardCardDeck, standardCardDeckCopy, valueMapping, copyDeck };