import { useEffect, useState } from 'react';

const useDebounce = (value: string, milliseconds: number) => {
    const [debouncedValue, setDebouncedValue] = useState<string>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, milliseconds);

        return () => {
            clearTimeout(handler);
        };
    }, [value, milliseconds]);

    return debouncedValue;
};

export default useDebounce;