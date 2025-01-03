import { useState } from 'react';
import Dice from '../Dice';
import RollButton from '../RollButton';
import { randomDiceValue } from '../../helper/lib';
import './RollDice.css';

const rollDuration = 1000;
const intervalDuration = 100;

const DiceRoller = () => {
    const [diceValues, setDiceValues] = useState<number[]>([1, 1]);
    const [isRolling, setIsRolling] = useState<boolean>(false);

    const rollDice = () => {
        setIsRolling(true);

        const roll = () => {
            const newValues = Array.from({ length: diceValues.length }, randomDiceValue);
            setDiceValues(newValues);
        };

        const interval = setInterval(roll, intervalDuration);
        setTimeout(() => {
            clearInterval(interval);
            setIsRolling(false);
        }, rollDuration);
    };

    return (
        <div className="roller">
            <div className="dice-container">
                {diceValues.map((value, index) => (
                    <Dice key={index} value={value} />
                ))}
            </div>
            <RollButton onRoll={rollDice} isRolling={isRolling} />
        </div>
    );
};

export default DiceRoller;
