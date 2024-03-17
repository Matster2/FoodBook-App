import { useState } from 'react';

type Filters = {
  [key: string]: any;
};

const useFilters = (initialState: Filters) => {
  const [filters, setFilters] = useState<Filters>(initialState);

  const setFilter = (key: string, value: any) => {
    setFilters((prevState) => {
      const newState = {
        ...prevState,
      };
      newState[key as keyof Filters] = value;
      return newState;
    });
  };

  const reset = () => {
    setFilters(initialState);
  };

  return {
    filters,
    setFilter,
    reset,
  };
};

export default useFilters;
