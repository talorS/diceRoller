type GameOverDisplayProps = {
    winner: number;
    isVisible: boolean;
}
const GameOverDisplay = ({ winner, isVisible }: GameOverDisplayProps) => {
    return isVisible ? <div className="game-over">Game Over! Player {winner} Wins!</div> : null
}

export default GameOverDisplay;
