import DiceContainer from "../DiceContainer";
import GameControls from "../GameControls";
import PlayerScoreboard from "../PlayerScoreboard";
import { useThemeContext } from "../../customHooks/ThemeContext";
import Toggle from "../Toggle";
import GameOverDisplay from "./GameOverDisplay";
import "./Game.css";
import { useGameState } from "../../customHooks/useGameState";
import NotificationDisplay from "./Notification";

const Game = () => {
    const gameState = useGameState();
    const { theme, toggleTheme } = useThemeContext();

    return (
        <div className={`game ${theme}`}>
            <Toggle theme={theme} onToggle={toggleTheme} />
            <PlayerScoreboard
                scores={gameState.scores}
                activePlayer={gameState.activePlayer}
                wins={gameState.wins}
            />
            <GameControls
                onRoll={gameState.rollDice}
                onHold={gameState.holdScore}
                onNewGame={gameState.resetGame}
                onUpdateWinningScore={gameState.updateWinningScore}
                winningScore={gameState.winningScore}
                gameOver={gameState.gameOver}
                isRolling={gameState.isRolling}
            />
            <DiceContainer diceValues={gameState.diceValues} />
            <NotificationDisplay message={gameState.doubleSixMessage} />
            <GameOverDisplay isVisible={gameState.gameOver} winner={gameState.activePlayer + 1} />
        </div>
    );
};

export default Game;
