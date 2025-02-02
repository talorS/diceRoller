import HoldButton from '../Button/HoldButton';
import Input from '../Button/Input';
import NewGameButton from '../Button/NewGameButton';
import RollButton from '../Button/RollButton';
import './GameControls.css'

type GameControlsProps = {
    onRoll: () => void;
    onHold: () => void;
    onNewGame: () => void;
    handleUpdateWinningScore: (event: React.ChangeEvent<HTMLInputElement>) => void;
    winningScore: number;
    gameOver: boolean;
    isRolling: boolean;
}

const GameControls = ({
    onRoll,
    onHold,
    onNewGame,
    handleUpdateWinningScore,
    winningScore,
    gameOver,
    isRolling,
}: GameControlsProps) => {
    return (
        <div className="controls">
            <label>
                Winning Score:
                <Input
                    winningScore={winningScore}
                    onUpdateWinningScore={handleUpdateWinningScore}
                    gameOver={gameOver}
                />
            </label>
            <RollButton gameOver={gameOver} isRolling={isRolling} onRoll={onRoll} />
            <HoldButton disabled={gameOver || isRolling} onHold={onHold} />
            <NewGameButton onNewGame={onNewGame} />
        </div>
    );
};

export default GameControls;