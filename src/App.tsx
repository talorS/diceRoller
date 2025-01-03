import ThemeProvider from "./customHooks/ThemeContext";
import Game from "./components/Game";
import './App.css';

const App = () => {
  return (
    <ThemeProvider>
      <div className="app">
        <h1>Roll the Dice Game</h1>
        <Game />
      </div>
    </ThemeProvider>
  );
};

export default App;
