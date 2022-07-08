export default class GameState {
	static INITIALIZE = 'initialize';
	static NEWGAME = 'new-game';
	static INITIALDEAL = 'initial-deal';
	static INPROGRESS = 'in-progress';
	static GAMEOVER = 'game-over';
	static NONE = 'none';

	static LIST = [
		GameState.NEWGAME,
		GameState.INPROGRESS,
		GameState.GAMEOVER,
		GameState.INITIALDEAL,
		GameState.INITIALIZE,
		GameState.NONE
	];
}