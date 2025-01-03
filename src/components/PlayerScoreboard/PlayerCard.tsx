import './Player.css'

type PlayerProps = {
    score: number;
    isActive: boolean;
    wins: number;
    currPlayer: number
}
const PlayerCard = ({ score, isActive, wins, currPlayer }: PlayerProps) => {
    return (
        <div
            className={`player ${isActive ? 'active' : ''}`}
        >
            <div>Player: {currPlayer + 1}</div>
            <div>Score: {score}</div>
            <div>Wins: {wins}</div>
        </div>
    );
};

export default PlayerCard;