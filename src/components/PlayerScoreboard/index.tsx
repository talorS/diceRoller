import PlayerCard from './PlayerCard';
import './PlayerScoreboard.css'

type PlayerScoreboardProps = {
    scores: number[];
    activePlayer: number;
    wins: number[];
}
const PlayerScoreboard = ({ scores, activePlayer, wins }: PlayerScoreboardProps) => {
    return (
        <div className="scoreboard">
            {scores.map((score, index) => (
                <PlayerCard
                    key={index}
                    score={score}
                    isActive={activePlayer === index}
                    wins={wins[index]}
                    currPlayer={index}
                />
            ))}
        </div>
    );
};

export default PlayerScoreboard;
