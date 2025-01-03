import './RollButton.css';

type RollButtonProps = {
    onRoll: () => void;
    isRolling: boolean;
};

const RollButton = ({ onRoll, isRolling }: RollButtonProps) => {
    return (
        <button
            onClick={onRoll}
            disabled={isRolling}
            className="roll-button">
            {isRolling ? 'Rolling...' : 'Roll Dice'}
        </button>
    );
};

export default RollButton;
