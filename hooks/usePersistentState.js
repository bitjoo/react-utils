import { useEffect, useState } from 'react';

function getLocalStorageValue(key) {
    const val = localStorage.getItem(key);
    if (!val) return null;
    try {
        return JSON.parse(val);
    } catch (e) {
        return null;
    }
}

function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function usePersistentState(key, defaultState = '') {
    const [state, setState] = useState(getLocalStorageValue(key) || defaultState);

    useEffect(() => {
        setLocalStorage(key, state);
    });

    return [state, setState];
}
