import { useState, useRef } from "react";

// middleware for useState

export function useUndo([state, setState]) {
    const history = useRef([state]);
    const [index, setIndex] = useState(0);

    function undo() {
        setIndex(Math.max(0, index - 1));
    }
    function redo() {
        setIndex(Math.min(history.current.length - 1, index + 1));
    }
    function newSetState(nextState) {
        const nextIndex = index + 1;
        // Truncate any future redos.
        history.current = history.current.slice(0, nextIndex);
        history.current[nextIndex] = nextState;
        setIndex(nextIndex);
        setState(nextState);
    }

    return [history.current[index], newSetState, undo, redo];
}
