# fwjs-davenport
Fun With JavaScript: The Davenport Card Game - By TheVirtuoid

## To All My JavaScript Friends

I'm making this repository public so that you can see the progress I make on this game.
You'll see both the successes and the failures I'll encounter as I build the game. 
This also gives everyone a place to make comments. Just keep the civil. :)

## Status:

| Date        | Data                                                                                                                    | 
|-------------|-------------------------------------------------------------------------------------------------------------------------|
| 13 May 2022 | Working on the 'Round' tests. This is about the tenth time I've refactored them. But I think I've finally got it right. |
| 28 May 2022 | FINALLY finished the 'Round' tests and the others tests. Had to fix my testing suite as it was configured wrong. |
| 31 May 2022 | Refactored all the tests, and started working on all the tests. |





## Rules of the game

1. 2 to 4 players
2. Each player is dealt five cards
   1. The deal starts with the player to the left of the dealer, going clockwise.
3. Each player places a card from their hand face-down on the table. This is called a cardlock.
   1. Once a card is in cardlock, it cannot be changed.
4. The cards are revealed.
5. High card wins. All other players must draw a card from the deck.
   1. Cards are drawn starting with the player to the left of the winner, going clockwise.
6. In case of a tie, there are no winners. All players must draw new cards.
   1. Cards are drawn starting with the player to the left of the dealer, going clockwise
7. Fist player that loses all their cards wins.
8. If the deck runs out of cards, the discard pile is shuffled and turned over.

### Scoring
1. Each card is given a value between 1 and 13
   1. The number cards are worth their number.
   2. The Ace is worth 1
   3. The Jack is worth 11
   4. The Queen is worth 12
   5. The King is worth 13
2. The suit of the card is not used in this game.
3. When the cards a revealed, the score for the cards are noted, and high score wins.

### Optional Replacement Rule
1. A player can discard a card and pick up a new card from the deck.
2. That new card MUST be played on that round.
3. Only one card can be exchanged per round.

### Optional Ace Rule
1. The Ace beats any face card (Jack, Queen, King)
2. When an Ace is played and a face card is the winner:
   1. The player playing the face card must draw two cards.
   2. The Ace player does not pick up a card.
3. If no face card is played, the player playing the Ace must draw two cards.
4. If there is a tie for the winner, normal rules apply. Ace player will only pick up one card.
5. If two or more Aces are played, they are treated as normal Aces and the optional rule does not apply.

