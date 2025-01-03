import DiceContainer from "../DiceContainer";
import GameControls from "../GameControls";
import PlayerScoreboard from "../PlayerScoreboard";
import { useThemeContext } from "../../customHooks/ThemeContext";
import Toggle from "../Toggle";
import GameOverDisplay from "./GameOverDisplay";
import MessageDisplay from "./MessageDisplay";
import "./Game.css";
import { useGameState } from "../../customHooks/useGameState";

const Game = () => {
    const {
        scores,
        activePlayer,
        diceValues,
        winningScore,
        isRolling,
        gameOver,
        wins,
        doubleSixMessage,
        resetGame,
        rollDice,
        holdScore,
        updateWinningScore,
    } = useGameState();

    const { theme, toggleTheme } = useThemeContext();

    return (
        <div className="game">
            <Toggle theme={theme} onToggle={toggleTheme} />
            <PlayerScoreboard
                scores={scores}
                activePlayer={activePlayer}
                wins={wins}
            />
            <GameControls
                onRoll={rollDice}
                onHold={holdScore}
                onNewGame={resetGame}
                onUpdateWinningScore={updateWinningScore}
                winningScore={winningScore}
                gameOver={gameOver}
                isRolling={isRolling}
            />
            <DiceContainer diceValues={diceValues} />
            {doubleSixMessage && <MessageDisplay message={doubleSixMessage} />}
            {gameOver && <GameOverDisplay winner={activePlayer + 1} />}
        </div>
    );
};

export default Game;
