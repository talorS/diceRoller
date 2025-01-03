import './RollHistroy.css';

type RollHistoryProps = {
    history: number[][];
};

const RollHistory = ({ history }: RollHistoryProps) => {
    return <div className="history-container">
        <h3>Roll History</h3>
        <ul>
            {history.map((roll, index) => (
                <li key={index}>
                    Roll {index + 1}: {roll.join(', ')}
                </li>
            ))}
        </ul>
    </div>
};

export default RollHistory;