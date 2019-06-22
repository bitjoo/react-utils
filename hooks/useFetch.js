import { useState, useEffect, useReducer } from "react";

const inistialState = {
    isLoading: true,
    isError: false,
    data: {}
};

const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_INIT":
            return { ...state, isLoading: true, isError: false };
        case "FETCH_SUCCESS":
            return { ...state, isLoading: false, isError: false, data: action.data };
        case "FETCH_FAILURE":
            return { ...state, isLoading: false, isError: true };
        default:
            throw new Error();
    }
};

export const useFetch = url => {
    const [state, dispatch] = useReducer(dataFetchReducer, inistialState);

    useEffect(() => {
        let isCurrent = true;

        async function fetchData() {
            dispatch({ type: "FETCH_INIT" });

            try {
                const res = await fetch(url);
                const data = await res.json();
                if (isCurrent) {
                    dispatch({ type: "FETCH_SUCCESS", data });
                }
            } catch (e) {
                if (isCurrent) {
                    dispatch({ type: "FETCH_FAILURE" });
                }
            }
        }

        fetchData();

        return () => {
            isCurrent = false;
        };
    }, []);

    return state;
};
