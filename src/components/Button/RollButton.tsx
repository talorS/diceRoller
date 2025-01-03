import Button from './BasicButton';
import './RollButton.css';

type RollButtonProps = {
    onRoll: () => void;
    isRolling: boolean;
    gameOver: boolean;
};

const RollButton = ({ onRoll, isRolling, gameOver }: RollButtonProps) => {
    return (
        <Button
            onClick={onRoll}
            disabled={isRolling || gameOver}
            className="roll-button"
        >
            {isRolling && !gameOver ? 'Rolling...' : 'Roll Dice'}
        </Button>
    );
};

export default RollButton;
