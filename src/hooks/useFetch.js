import { useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

import useAuth from './useAuth';

import { isNullOrUndefined } from '../utils/utils';
import { isEmptyOrWhiteSpace } from '../utils/stringUtils';
import { LanguageContext } from '../contexts/LanguageContext';

const useFetch = (url) => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const {
    tokens: { accessToken },
  } = useAuth();
  
  const { currentLanguage } = useContext(LanguageContext);

  const fetch = useCallback(async () => {
    setError(undefined);
    setLoading(true);

    try {
      const { data: responseData } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Language: currentLanguage
        },
      });

      setData(responseData);
      setLoading(false);

      return responseData;
    } catch (e) {
      setError(e);
      setLoading(false);
      throw e;
    }
  }, [url, accessToken]);

  useEffect(() => {
    if (!isNullOrUndefined(url) && !isEmptyOrWhiteSpace(url)) {
      fetch();
    }
  }, [url, fetch]);

  return {
    data,
    error,
    loading,
    refetch: fetch,
  };
};

export default useFetch;
