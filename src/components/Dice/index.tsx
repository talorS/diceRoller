import Pip from '../Pip';
import './Dice.css';

type DiceProps = {
    value: number;
};

const Dice = ({ value }: DiceProps) => {
    const getPips = () => Array.from({ length: value }, (_, i) => <Pip key={i} />);
    return <div className={`dice dice-${value}`}>{getPips()}</div>;
};

export default Dice;
