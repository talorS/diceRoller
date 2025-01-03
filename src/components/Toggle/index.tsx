import { ThemeType } from "../../customHooks/ThemeContext";
import './Toggle.css'

type ToggleProps = {
    theme: ThemeType;
    onToggle: () => void;
};

const Toggle = ({ theme, onToggle }: ToggleProps) => {
    return <button onClick={onToggle} className="theme-toggle-button">
        {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button >
};

export default Toggle;
