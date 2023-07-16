import { useEffect, useState } from 'react';

export default (callback, options = {
    delay: 3000
}) => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            setResults(await callback());
        }, options.delay);

        return () => clearTimeout(delayDebounce);
    }, [search]);

    return [search, setSearch, results];
}