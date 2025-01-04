import { useThemeContext } from "../../customHooks/ThemeContext";
import './Toggle.css'

const Toggle = () => {
    const { theme, toggleTheme } = useThemeContext();

    return <button onClick={toggleTheme} className="theme-toggle-button">
        {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button >
};

export default Toggle;
