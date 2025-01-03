import Button from './BasicButton';
import './HoldButton.css';

type HoldButtonProps = {
    onHold: () => void;
    gameOver: boolean;
};

const HoldButton = ({ onHold, gameOver }: HoldButtonProps) => {
    return (
        <Button
            onClick={onHold}
            disabled={gameOver}
            className="hold-button"
        >
            Hold
        </Button>
    );
};

export default HoldButton;
