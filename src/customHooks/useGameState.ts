import { useState } from "react";
import { PLAYERS_SIZE, DICES_SIZE, DEFAULT_WINNING_SCORE, INTERVAL_DURATION, ROLL_DURATION } from "../helper/constants";
import { initArray, randomDiceValue } from "../helper/utilits";

export const useGameState = () => {
    const [scores, setScores] = useState<number[]>(() => initArray(PLAYERS_SIZE, 0));
    const [currentScore, setCurrentScore] = useState<number>(0);
    const [activePlayer, setActivePlayer] = useState<number>(0);
    const [diceValues, setDiceValues] = useState<number[]>(() => initArray(DICES_SIZE, 1));
    const [winningScore, setWinningScore] = useState<number>(DEFAULT_WINNING_SCORE);
    const [isRolling, setIsRolling] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [wins, setWins] = useState<number[]>(() => initArray(PLAYERS_SIZE, 0));
    const [doubleSixMessage, setDoubleSixMessage] = useState<string | null>(null);

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
        updateWinningScore,
    };
};