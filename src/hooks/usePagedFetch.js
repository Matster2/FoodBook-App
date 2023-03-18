import { useState, useEffect } from 'react';

import useFetch from './useFetch';
import { isUndefined, nestedCopy } from '../utils/utils';

const usePagedFetch = (url) => {
  const [results, setResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(undefined);
  const [totalResults, setTotalResults] = useState(0);

  const { data, error, loading, refetch } = useFetch(url);

  const resetState = () => {
    setResults([]);
    setCurrentPage(1);
    setTotalPages(1);
    setPageSize(undefined);
    setTotalResults(0);
  };

  useEffect(() => {
    resetState();
  }, [url]);

  useEffect(() => {
    if (!isUndefined(data)) {
      setCurrentPage(data.pageNumber);
      setTotalPages(data.totalPages);
      setPageSize(data.pageSize);
      setTotalResults(data.totalRecords);
      setResults(nestedCopy(data.results));
    }
  }, [data]);

  return {
    results,
    error,
    loading,
    currentPage,
    totalPages,
    pageSize,
    totalResults,
    refetch,
    data,
  };
};

export default usePagedFetch;
