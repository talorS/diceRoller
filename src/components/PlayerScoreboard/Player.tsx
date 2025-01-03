type PlayerProps = {
    score: number;
    activePlayer: number;
    winsNum: number;
    currPlayer: number
}
const Player = ({ score, activePlayer, winsNum, currPlayer }: PlayerProps) => {
    return (
        <div
            className={`player ${activePlayer === currPlayer ? 'active' : ''}`}
        >
            <div>Player: {currPlayer + 1}</div>
            <div>Score: {score}</div>
            <div>Wins: {winsNum}</div>
        </div>
    );
};

export default Player;