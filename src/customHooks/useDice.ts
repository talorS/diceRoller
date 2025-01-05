import { useState } from "react";
import { DICES_SIZE, INTERVAL_DURATION, ROLL_DURATION } from "../helper/constants";
import { randomDiceValue } from "../helper/utilits";

export const useDice = () => {
    const [diceValues, setDiceValues] = useState<number[]>(Array(DICES_SIZE).fill(1));
    const [isRolling, setIsRolling] = useState<boolean>(false);
    const [doubleSixMessage, setDoubleSixMessage] = useState<string | null>(null);

    const resetDice = () => {
        setDiceValues(Array(DICES_SIZE).fill(1));
        setIsRolling(false);
        setDoubleSixMessage(null);
    };

    const rollDice = (
        gameOver: boolean,
        setCurrentScore: React.Dispatch<React.SetStateAction<number>>,
        switchPlayer: () => void
    ) => {
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

            const isDoubleSix = finalDiceValues.every((value) => value === 6);
            if (isDoubleSix) {
                handleDoubleSix(setCurrentScore, switchPlayer);
            } else {
                const totalScore = finalDiceValues.reduce((sum, val) => sum + val, 0);
                setCurrentScore((prev) => prev + totalScore);
            }
        }, ROLL_DURATION);
    };

    const handleDoubleSix = (
        setCurrentScore: React.Dispatch<React.SetStateAction<number>>,
        switchPlayer: () => void
    ) => {
        setDoubleSixMessage("You rolled double six! Round score lost!");
        setTimeout(() => {
            setDoubleSixMessage(null);
            setCurrentScore(0);
            switchPlayer();
        }, ROLL_DURATION);
    };

    return {
        diceValues,
        isRolling,
        rollDice,
        doubleSixMessage,
        resetDice,
    };
};