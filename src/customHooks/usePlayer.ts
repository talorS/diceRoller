import { useState } from "react";

export const usePlayer = () => {
    const [activePlayer, setActivePlayer] = useState<number>(0);

    const resetPlayer = () => {
        setActivePlayer(0);
    };

    const switchPlayer = () => {
        setActivePlayer((prevPlayer) => 1 - prevPlayer);
    };

    return {
        activePlayer,
        switchPlayer,
        resetPlayer,
    };
};