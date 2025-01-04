import DiceContainer from "../DiceContainer";
import GameControls from "../GameControls";
import PlayerScoreboard from "../PlayerScoreboard";
import GameOverDisplay from "./GameOverDisplay";
import "./Game.css";
import { useGameState } from "../../customHooks/useGameState";
import NotificationDisplay from "./Notification";
import React from "react";

const Game = () => {
    const gameState = useGameState();


    return (
        <div className='game'>
            <PlayerScoreboard
                scores={gameState.scores}
                activePlayer={gameState.activePlayer}
                wins={gameState.wins}
            />
            <GameControls
                onRoll={gameState.rollDice}
                onHold={gameState.holdScore}
                onNewGame={gameState.resetGame}
                handleUpdateWinningScore={gameState.handleUpdateWinningScore}
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
