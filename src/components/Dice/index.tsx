import './Dice.css';

type DiceProps = {
    value: number;
};

const Dice = ({ value }: DiceProps) => {
    return <div className="dice">{value}</div>;
};

export default Dice;
