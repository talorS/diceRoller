type GameOverDisplayProps = {
    winner: number
}
const GameOverDisplay = ({ winner }: GameOverDisplayProps) => {
    return <div className="game-over">Game Over! Player {winner} Wins!</div>
}

export default GameOverDisplay;
