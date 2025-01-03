import { useState } from "react";
import DiceContainer from "../DiceContainer";
import GameControls from "../GameControls";
import PlayerScoreboard from "../PlayerScoreboard";
import './Game.css'
import { randomDiceValue } from "../../helper/lib";

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

    console.log(currentScore)

    const initNewGame = () => {
        setScores([0, 0]);
        setCurrentScore(0);
        setActivePlayer(0);
        setDiceValues([1, 1]);
        setGameOver(false);
    };

    const rollDice = () => {
        if (gameOver || isRolling) return;
        setIsRolling(true);

        const roll = () => {
            const newValues = Array.from({ length: diceValues.length }, randomDiceValue);
            setDiceValues(newValues);
        };

        const interval = setInterval(roll, intervalDuration);
        setTimeout(() => {
            clearInterval(interval);
            const finalDiceValues = Array.from({ length: diceValues.length }, randomDiceValue);
            setDiceValues(finalDiceValues);
            setIsRolling(false);
            if (finalDiceValues.every(val => val === 6)) {
                // Double six: reset round score
                setCurrentScore(0);
                switchPlayer();
            } else {
                setCurrentScore((prevScore) => prevScore + finalDiceValues[0] + finalDiceValues[1]);
            }
        }, rollDuration);
    };

    const holdScore = () => {
        if (gameOver) return;

        const updatedScores = [...scores];
        updatedScores[activePlayer] += currentScore;
        setScores(updatedScores);

        if (updatedScores[activePlayer] >= winningScore) {
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
            <PlayerScoreboard
                scores={scores}
                activePlayer={activePlayer}
                gameOver={gameOver}
                winningScore={winningScore}
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
            {gameOver && <div className="game-over">Game Over! Player {activePlayer + 1} Wins!</div>}
        </div>
    );
};

export default Game;