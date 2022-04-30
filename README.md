# fwjs-davenport
Fun With JavaScript: The Davenport Card Game - By TheVirtuoid

## Rules of the game

1. 2 to 7 players
2. Each player is dealt five cards
3. Each player places a card from their hand face-down on the table
4. The cards are revealed.
5. High card wins. All other players must draw a card from the deck.
6. In case of a tie, only those players who did not have the high card must draw from the deck.
7. Fist player that loses all their cards wins.
8. If two or more players go out at the same time, a playoff is done until there is one winner.
9. If the deck runs out of cards, the discard pile is shuffled and turned over.
10. A player can discard a card and pick up a new card from the deck.
    1. That new card MUST be played on that round.
    2. Only one card can be exchanged per round.

### Playoff

1. Each player draws three cards from a newly shuffled deck.
2. A round is played as described above.
3. Low card player is eliminated.
4. Each remaining player picks up a card and play resumes.
5. In case of a tie, see #4 above.
6. The Ace Rule does not apply during the playoff.
7. Optional: Instead of elimination, a player can reach a predetermined number of wins, such as 3.

### Scoring and Options

1. Each card is given a value between 1 and 13
   1. The number cards are worth their number.
   2. The Ace is worth 1
   3. The Jack is worth 11
   4. The Queen is worth 12
   5. The King is worth 13
2. The suit of the card is not used in this game.
3. When the cards a revealed, the score for the cards are noted, and high score wins.
4. Special Ace Rules (Optional):
   1. The Ace beats any face card (Jack, Queen, King)
   2. When an Ace is played and a face card is the winner, the player playing the highest face card must draw two cards
   3. If no face card is played, the player playing the Ace must draw two cards.

Ace Rules Example:

1. Ace, Eight, Jack, King: The King draws two cards as it normally would have won. The Jack and Eight pick up only one.
2. Ace, Seven, Eight, Nine: The Ace draws two cards
3. Ace, Ace, Seven, Eight: Both Aces draw two cards
4. Ace, Seven, King, King: Both Kings draw two cards

## Example Game Play Round

1. Dealer deals 5 cards to each player
2. For each player in sequence:
   1. System waits for player to make a decision
   2. If player submits card into play, the play is recorded and the player's hand is done.
   3. If player turns in a card:
      1. Retired card is placed on discard pile face down
      2. Player draws a card and submits card into play, without looking at card.
      3. The play is record and the player's had ends.
3. All cards are revealed.
4. Player with the highest value card wins the round.
   1. If there are two or more players with the same value, then each player is declared the winner
5. Players who do not have the highest card must draw a card from the deck and add it to their hand. They can see the card.
6. Play continues until one or more players do not have any cards left at the end of the round.

### Optional Ace Rules

4. Player with the highest value card wins the round.
   1. If any losing player shows an Ace and the winner holds a Face card (Jack, Queen King):
      1. The Ace is declared the winner.
      2. If two players show Aces, each is declared the winner.
      3. Each player who loses picks up a single card.
      4. The player with the face card picks up an additional card.
      5. Only the player with the highest face card picks up the additional card.
      6. If two players have the highest face card, all those players will pick up an additional card.
      7. Example: P1 = J, P2 = K, P3 = K. P2 and P3 pick up an additional card, while P1 does not.
   2. If any losing players shows an Aces and the winner does NOT hold a Face card (Jack, Queen King):
      1. The player showing the Ace draws the normal card plus an additional al.
      2. If more than one player shows an Ace, each must draw the additional card.


### Playoffs

1. A playoff is declared when two or more players end the game with no cards remaining in their hands.
2. Only the players with no cards left can participate in the playoff. All other players are eliminiated.
3. The Playoff is played using a freshly shuffled deck.
4. The Playoff follows the same procedure as the normal game above, with the following exceptions:
   1. The Optional Ace Rules are not in effect, even if they were for the normal game.
   2. The player with the lowest scoring card is eliminated from the playoff.
      1. If more than one player has the lowest scoring card, then no one is eliminated and play resumes.
   3. The final player left in the game is declared the winner.


