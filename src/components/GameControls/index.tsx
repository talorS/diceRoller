import RollButton from '../RollButton';
import './GameControls.css'

type GameControlsProps = {
    rollDice: () => void;
    holdScore: () => void;
    initializeNewGame: () => void;
    updateWinningScore: (event: React.ChangeEvent<HTMLInputElement>) => void;
    winningScore: number;
    gameOver: boolean;
    isRolling: boolean;
}

const GameControls = ({
    rollDice,
    holdScore,
    initializeNewGame,
    updateWinningScore,
    winningScore,
    gameOver,
    isRolling,
}: GameControlsProps) => {
    return (
        <div className="controls">
            <input
                type="number"
                value={winningScore}
                onChange={updateWinningScore}
                placeholder="Winning Score"
                disabled={gameOver}
                className="winning-score-input"
            />
            <RollButton gameOver={gameOver} isRolling={isRolling} onRoll={rollDice} />
            <button onClick={holdScore} disabled={gameOver} className="hold-button">
                Hold
            </button>
            <button onClick={initializeNewGame} className="new-game-button">
                New Game
            </button>
        </div>
    );
};

export default GameControls;