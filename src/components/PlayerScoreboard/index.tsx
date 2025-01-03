import Player from './Player';
import './PlayerScoreboard.css'

type PlayerScoreboardProps = {
    scores: number[];
    activePlayer: number;
    gameOver: boolean;
    winningScore: number;
    wins: number[];
}
const PlayerScoreboard = ({ scores, activePlayer, gameOver, winningScore, wins }: PlayerScoreboardProps) => {
    return (
        <div className="scoreboard">
            {scores.map((score, index) => (
                <Player key={index}
                    score={score}
                    activePlayer={activePlayer}
                    gameOver={gameOver}
                    winningScore={winningScore}
                    winsNum={wins[index]}
                    index={index}
                />
            ))}
        </div>
    );
};

export default PlayerScoreboard;
