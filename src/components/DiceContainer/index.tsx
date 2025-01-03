import Dice from "../Dice";
import './DiceContainer.css'

type DiceContainerProps = { diceValues: number[] };

const DiceContainer = ({ diceValues }: DiceContainerProps) => {
    return (
        <div className="dice-container">
            {diceValues.map((value, index) => (
                <Dice key={index} value={value} />
            ))}
        </div>
    );
};

export default DiceContainer;