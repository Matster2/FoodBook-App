import { useEffect, useState } from "react";

interface UseSearchProps<TResult> {
    queryFn: () => Promise<TResult[]>,
    delay: number;
}

const useSearchQuery = function <TResult>({
    queryFn = async () => ([]),
    delay = 3000
}: UseSearchProps<TResult>) {
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [results, setResults] = useState<TResult[]>([]);

    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            setLoading(true);
            setResults(await queryFn());
            setLoading(false);
        }, delay);

        return () => clearTimeout(delayDebounce);
    }, [search]);

    return {
        search,
        setSearch,
        results,
        loading
    }
}

export default useSearchQuery;