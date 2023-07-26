import { useEffect, useState } from 'react';

export default (callback, options = {
    delay: 3000
}) => {
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            setLoading(true);
            setResults(await callback());
            setLoading(false);
        }, options.delay);

        return () => clearTimeout(delayDebounce);
    }, [search]);

    return [search, setSearch, results, loading];
}