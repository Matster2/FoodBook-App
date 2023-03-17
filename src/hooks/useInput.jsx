import { useState, useEffect } from 'react';

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue !== null ? initialValue : '');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue(initialValue);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return {
    value,
    onChange: handleChange,
    setValue,
    reset,
  };
};

export default useInput;
