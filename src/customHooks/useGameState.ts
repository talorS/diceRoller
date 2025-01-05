import { useDice } from "./useDice";
import { usePlayer } from "./usePlayer";
import { useScore } from "./useScore";
import { useWinningScore } from "./useWinningScore";

export const useGameState = () => {
    const { scores, currentScore, wins, setCurrentScore, gameOver, resetScore, holdScore } = useScore();
    const { activePlayer, switchPlayer, resetPlayer } = usePlayer();
    const { diceValues, isRolling, rollDice, doubleSixMessage, resetDice } = useDice();
    const { winningScore, handleUpdateWinningScore, resetWinningScore } = useWinningScore();

    const resetGame = () => {
        resetScore();
        resetPlayer();
        resetDice();
        resetWinningScore();
    };

    const boundRollDice = () => rollDice(gameOver, setCurrentScore, switchPlayer);
    const boundHoldScore = () => holdScore(activePlayer, winningScore, switchPlayer);

    return {
        scores,
        currentScore,
        activePlayer,
        diceValues,
        winningScore,
        isRolling,
        gameOver,
        doubleSixMessage,
        wins,
        resetGame,
        rollDice: boundRollDice,
        holdScore: boundHoldScore,
        handleUpdateWinningScore,
    };
};
