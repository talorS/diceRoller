import { useState } from "react";
import DiceContainer from "../DiceContainer";
import GameControls from "../GameControls";
import PlayerScoreboard from "../PlayerScoreboard";
import { randomDiceValue } from "../../helper/lib";
import { useThemeContext } from "../../customHooks/ThemeContext";
import Toggle from "../Toggle";
import './Game.css'
import GameOverDisplay from "./GameOverDisplay";
import MessageDisplay from "./MessageDisplay";

const rollDuration = 1000;
const intervalDuration = 100;
const dicesSize = 2;
const playersSize = 2;

const initDiceValues = (size: number) => Array(size).fill(1);
const initPlayers = (size: number) => Array(size).fill(0);

const Game = () => {
    const [scores, setScores] = useState(() => initPlayers(playersSize));
    const [currentScore, setCurrentScore] = useState(0);
    const [activePlayer, setActivePlayer] = useState(0); // 0 for Player 1, 1 for Player 2
    const [diceValues, setDiceValues] = useState<number[]>(() => initDiceValues(dicesSize));
    const [winningScore, setWinningScore] = useState(100); // Default winning score
    const [isRolling, setIsRolling] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [wins, setWins] = useState(() => initPlayers(playersSize));
    const [doubleSixMessage, setDoubleSixMessage] = useState<string | null>(null);

    const { theme, toggleTheme } = useThemeContext();

    const initNewGame = () => {
        setScores(initPlayers(playersSize));
        setCurrentScore(0);
        setActivePlayer(0);
        setDiceValues(initDiceValues(dicesSize));
        setGameOver(false);
        setIsRolling(false);
    };

    const rollDice = () => {
        if (gameOver || isRolling) return;
        setIsRolling(true);

        const interval = setInterval(() => {
            setDiceValues(prevValues => prevValues.map(randomDiceValue));
        }, intervalDuration);

        setTimeout(() => {
            clearInterval(interval);

            const finalDiceValues = Array.from({ length: diceValues.length }, randomDiceValue);
            setDiceValues(finalDiceValues);
            setIsRolling(false);

            if (finalDiceValues.every(val => val === 6)) {
                setDoubleSixMessage('You rolled double six! Switching player...');
                setTimeout(() => {
                    setDoubleSixMessage(null);
                    setCurrentScore(0);
                    switchPlayer();
                }, rollDuration);
            } else {
                const totalScore = finalDiceValues.reduce((acc, val) => acc + val, 0);
                setCurrentScore(prevScore => prevScore + totalScore);
            }
        }, rollDuration);
    };

    const holdScore = () => {
        const shouldHold = gameOver || isRolling || doubleSixMessage;
        if (shouldHold) return;

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

    const switchPlayer = () => {
        setActivePlayer((prevPlayer) => (prevPlayer === 0 ? 1 : 0));
    };

    const updateWinningScore = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWinningScore(Number(event.target.value) || 100);
    };

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
                rollDice={rollDice}
                holdScore={holdScore}
                initializeNewGame={initNewGame}
                updateWinningScore={updateWinningScore}
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