import { useEffect } from 'react';

export function useLogging(message) {
    useEffect(() => {
        console.log(message);
    }, [message]);
}
