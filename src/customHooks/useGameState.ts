import { useState } from "react";
import { PLAYERS_SIZE, DICES_SIZE, DEFAULT_WINNING_SCORE, INTERVAL_DURATION, ROLL_DURATION } from "../helper/constants";
import { randomDiceValue } from "../helper/utilits";

export const useGameState = () => {
    const [scores, setScores] = useState<number[]>(Array(PLAYERS_SIZE).fill(0));
    const [currentScore, setCurrentScore] = useState<number>(0);
    const [activePlayer, setActivePlayer] = useState<number>(0);
    const [diceValues, setDiceValues] = useState<number[]>(Array(DICES_SIZE).fill(1));
    const [winningScore, setWinningScore] = useState<number>(DEFAULT_WINNING_SCORE);
    const [isRolling, setIsRolling] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [wins, setWins] = useState<number[]>(Array(PLAYERS_SIZE).fill(0));
    const [doubleSixMessage, setDoubleSixMessage] = useState<string | null>(null);

    const resetGame = () => {
        setScores(Array(PLAYERS_SIZE).fill(0));
        setCurrentScore(0);
        setActivePlayer(0);
        setDiceValues(Array(DICES_SIZE).fill(1));
        setGameOver(false);
        setIsRolling(false);
        setDoubleSixMessage(null);
    };

    const switchPlayer = () => {
        setActivePlayer((prevPlayer) => 1 - prevPlayer);
    };

    const rollDice = () => {
        if (gameOver || isRolling || doubleSixMessage) return;

        setIsRolling(true);

        const interval = setInterval(() => {
            setDiceValues((prevValues) => prevValues.map(randomDiceValue));
        }, INTERVAL_DURATION);

        setTimeout(() => {
            clearInterval(interval);
            const finalDiceValues = Array.from({ length: DICES_SIZE }, randomDiceValue);
            setDiceValues(finalDiceValues);
            setIsRolling(false);

            if (finalDiceValues.every((value) => value === 6)) {
                handleDoubleSix();
            } else {
                const totalScore = finalDiceValues.reduce((sum, val) => sum + val, 0);
                setCurrentScore((prev) => prev + totalScore);
            }
        }, ROLL_DURATION);
    };

    const handleDoubleSix = () => {
        setDoubleSixMessage("You rolled double six! Switching player...");
        setTimeout(() => {
            setDoubleSixMessage(null);
            setCurrentScore(0);
            switchPlayer();
        }, ROLL_DURATION);
    };

    const holdScore = () => {
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

    const handleUpdateWinningScore = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newScore = Number(event.target.value) || DEFAULT_WINNING_SCORE;
        setWinningScore(newScore);
    };

    return {
        scores,
        currentScore,
        activePlayer,
        diceValues,
        winningScore,
        isRolling,
        gameOver,
        wins,
        doubleSixMessage,
        resetGame,
        switchPlayer,
        rollDice,
        holdScore,
        handleUpdateWinningScore,
    };
};