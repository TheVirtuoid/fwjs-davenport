export default class GameState {
	static NEWGAME = 'new-game';
	static INITIALDEAL = 'initial-deal';
	static INPROGRESS = 'in-progress';
	static GAMEOVER = 'game-over';

	static LIST = [ GameState.NEWGAME, GameState.INPROGRESS, GameState.GAMEOVER, GameState.INITIALDEAL ];
}