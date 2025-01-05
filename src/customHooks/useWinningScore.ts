import { useState } from "react";
import { DEFAULT_WINNING_SCORE } from "../helper/constants";

export const useWinningScore = () => {
    const [winningScore, setWinningScore] = useState<number>(DEFAULT_WINNING_SCORE);

    const resetWinningScore = () => {
        setWinningScore(DEFAULT_WINNING_SCORE);
    };

    const handleUpdateWinningScore = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newScore = Number(event.target.value) || DEFAULT_WINNING_SCORE;
        setWinningScore(newScore);
    };

    return {
        winningScore,
        handleUpdateWinningScore,
        resetWinningScore,
    };
};