import { useState } from "react";
import { PLAYERS_SIZE } from "../helper/constants";

export const useScore = () => {
    const [scores, setScores] = useState<number[]>(Array(PLAYERS_SIZE).fill(0));
    const [currentScore, setCurrentScore] = useState<number>(0);
    const [wins, setWins] = useState<number[]>(Array(PLAYERS_SIZE).fill(0));
    const [gameOver, setGameOver] = useState<boolean>(false);

    const resetScore = () => {
        setScores(Array(PLAYERS_SIZE).fill(0));
        setCurrentScore(0);
        setWins(Array(PLAYERS_SIZE).fill(0));
        setGameOver(false);
    };

    const holdScore = (activePlayer: number, winningScore: number, switchPlayer: () => void) => {
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

    return {
        scores,
        currentScore,
        setCurrentScore,
        wins,
        setWins,
        gameOver,
        setGameOver,
        resetScore,
        holdScore,
    };
};