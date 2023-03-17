import { useState } from 'react';

const useFilters = (initialState) => {
  const [filters, setFilters] = useState(initialState);

  const setFilter = (filter, value) => {
    setFilters((prevState) => {
      const newState = {
        ...prevState,
      };
      newState[filter] = value;
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
