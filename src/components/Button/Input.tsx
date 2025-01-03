import './Input.css';

type InputProps = {
    onUpdateWinningScore: (event: React.ChangeEvent<HTMLInputElement>) => void;
    winningScore: number;
    gameOver: boolean
}

const Input = ({ onUpdateWinningScore, gameOver, winningScore }: InputProps) => {
    return (
        <input
            type="number"
            value={winningScore}
            onChange={onUpdateWinningScore}
            disabled={gameOver}
            className="winning-score-input"
        />
    );
};

export default Input;
