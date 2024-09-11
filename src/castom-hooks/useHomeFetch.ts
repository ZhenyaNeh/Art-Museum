import { useEffect, useState } from 'react';

import { fetchHomeData } from '../api/api';
import { ArtsInfo } from '../constants/types';

const useHomeFetch = () => {
  const [arts, setArts] = useState<ArtsInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDataForHome();
  }, []);

  const fetchDataForHome = async () => {
    setLoading(true);
    try {
      const response = await fetchHomeData();
      setArts(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return { arts, loading, error };
};

export default useHomeFetch;
