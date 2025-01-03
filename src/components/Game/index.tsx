import { useState } from "react";
import DiceContainer from "../DiceContainer";
import GameControls from "../GameControls";
import PlayerScoreboard from "../PlayerScoreboard";
import { initArray, randomDiceValue } from "../../helper/utility";
import { useThemeContext } from "../../customHooks/ThemeContext";
import Toggle from "../Toggle";
import GameOverDisplay from "./GameOverDisplay";
import MessageDisplay from "./MessageDisplay";
import "./Game.css";
import { DEFAULT_WINNING_SCORE, DICES_SIZE, INTERVAL_DURATION, PLAYERS_SIZE, ROLL_DURATION } from "../../helper/constants";

const Game: React.FC = () => {
    const [scores, setScores] = useState<number[]>(() => initArray(PLAYERS_SIZE, 0));
    const [currentScore, setCurrentScore] = useState<number>(0);
    const [activePlayer, setActivePlayer] = useState<number>(0);
    const [diceValues, setDiceValues] = useState<number[]>(() => initArray(DICES_SIZE, 1));
    const [winningScore, setWinningScore] = useState<number>(DEFAULT_WINNING_SCORE);
    const [isRolling, setIsRolling] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [wins, setWins] = useState<number[]>(() => initArray(PLAYERS_SIZE, 0));
    const [doubleSixMessage, setDoubleSixMessage] = useState<string | null>(null);

    const { theme, toggleTheme } = useThemeContext();

    // Game actions
    const resetGame = (): void => {
        setScores(initArray(PLAYERS_SIZE, 0));
        setCurrentScore(0);
        setActivePlayer(0);
        setDiceValues(initArray(DICES_SIZE, 1));
        setGameOver(false);
        setIsRolling(false);
    };

    const switchPlayer = (): void => {
        setActivePlayer((prevPlayer) => (prevPlayer === 0 ? 1 : 0));
    };

    const rollDice = (): void => {
        if (gameOver || isRolling) return;

        setIsRolling(true);
        const interval = setInterval(() => {
            setDiceValues((prevValues) => prevValues.map(randomDiceValue));
        }, INTERVAL_DURATION);

        setTimeout(() => {
            clearInterval(interval);
            const finalDiceValues = Array.from({ length: diceValues.length }, randomDiceValue);
            setDiceValues(finalDiceValues);
            setIsRolling(false);

            if (finalDiceValues.every((val) => val === 6)) {
                setDoubleSixMessage("You rolled double six! Switching player...");
                setTimeout(() => {
                    setDoubleSixMessage(null);
                    setCurrentScore(0);
                    switchPlayer();
                }, ROLL_DURATION);
            } else {
                const totalScore = finalDiceValues.reduce((acc, val) => acc + val, 0);
                setCurrentScore((prevScore) => prevScore + totalScore);
            }
        }, ROLL_DURATION);
    };

    const holdScore = (): void => {
        if (gameOver || isRolling || doubleSixMessage) return;

        const updatedScores = [...scores];
        updatedScores[activePlayer] += currentScore;
        setScores(updatedScores);

        if (updatedScores[activePlayer] >= winningScore) {
            const updatedWins = [...wins];
            updatedWins[activePlayer] += 1;
            setWins(updatedWins);
            setGameOver(true);
        } else {
            setCurrentScore(0);
            switchPlayer();
        }
    };

    const updateWinningScore = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setWinningScore(Number(event.target.value) || DEFAULT_WINNING_SCORE);
    };

    // Render
    return (
        <div className="game">
            <Toggle theme={theme} onToggle={toggleTheme} />
            <PlayerScoreboard
                scores={scores}
                activePlayer={activePlayer}
                gameOver={gameOver}
                winningScore={winningScore}
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
