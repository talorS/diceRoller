import Button from './BasicButton';
import './HoldButton.css';

type HoldButtonProps = {
    onNewGame: () => void;
};

const NewGameButton = ({ onNewGame }: HoldButtonProps) => {
    return (
        <Button
            onClick={onNewGame}
            className="new-game-button"
        >
            New Game
        </Button>
    );
};

export default NewGameButton;
