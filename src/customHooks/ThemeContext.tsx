import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from 'react';

export type ThemeType = 'light' | 'dark';

type ThemeContextProps = {
    theme: ThemeType,
    toggleTheme: Dispatch<SetStateAction<ThemeType>>
}

type ThemeProviderProps = {
    children: ReactNode
}

const initialContext: ThemeContextProps = {
    theme: 'light',
    toggleTheme: () => { },
}

const ThemeContext = createContext<ThemeContextProps>(initialContext);

export default function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<ThemeType>('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={theme}>{children}</div>
        </ThemeContext.Provider>
    )
}

export function useThemeContext(): ThemeContextProps {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useThemeContext must be used within a ThemeProvider')
    }
    return context;
}