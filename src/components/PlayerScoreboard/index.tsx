import './PlayerScoreboard.css'

type PlayerScoreboardProps = {
    scores: number[];
    activePlayer: number;
    gameOver: boolean;
    winningScore: number;
}
const PlayerScoreboard = ({ scores, activePlayer, gameOver, winningScore }: PlayerScoreboardProps) => {
    return (
        <div className="scoreboard">
            {scores.map((score, index) => (
                <div
                    key={index}
                    className={`player ${activePlayer === index ? 'active' : ''}`}
                >
                    Player {index + 1}: {score}{' '}
                    {gameOver && score >= winningScore && '(Winner!)'}
                </div>
            ))}
        </div>
    );
};

export default PlayerScoreboard;
