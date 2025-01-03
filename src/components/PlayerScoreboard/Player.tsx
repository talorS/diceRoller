type PlayerProps = {
    score: number;
    activePlayer: number;
    winningScore: number;
    gameOver: boolean;
    winsNum: number;
    index: number
}
const Player = ({ score, activePlayer, gameOver, winsNum, winningScore, index }: PlayerProps) => {
    return (
        <div
            className={`player ${activePlayer === index ? 'active' : ''}`}
        >
            Player {index + 1}: {score}{' '}
            {gameOver && score >= winningScore && '(Winner!)'}
            <div>Wins: {winsNum}</div>
        </div>
    );
};

export default Player;