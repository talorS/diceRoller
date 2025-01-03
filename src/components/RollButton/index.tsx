import './RollButton.css';

type RollButtonProps = {
    onRoll: () => void;
    isRolling: boolean;
    gameOver: boolean;
};

const RollButton = ({ onRoll, isRolling, gameOver }: RollButtonProps) => {
    return (
        <button
            onClick={onRoll}
            disabled={isRolling || gameOver}
            className="roll-button">
            {isRolling && !gameOver ? 'Rolling...' : 'Roll Dice'}
        </button>
    );
};

export default RollButton;
