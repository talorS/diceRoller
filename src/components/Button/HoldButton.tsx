import Button from './BasicButton';
import './HoldButton.css';

type HoldButtonProps = {
    onHold: () => void;
    disabled: boolean;
};

const HoldButton = ({ onHold, disabled }: HoldButtonProps) => {
    return (
        <Button
            onClick={onHold}
            disabled={disabled}
            className="hold-button"
        >
            Hold
        </Button>
    );
};

export default HoldButton;
