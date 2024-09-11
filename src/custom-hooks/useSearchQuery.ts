import { fetchSearchData } from '@api/api';
import { ArtsInfo } from '@utils/Types/types';
import { useState } from 'react';

const useSearchQuery = () => {
  const [arts, setArts] = useState<ArtsInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDataForSearch = async (
    query: string,
    isPublic: boolean | null
  ) => {
    setLoading(true);
    try {
      if (query) {
        const response = await fetchSearchData(query, isPublic);
        setArts(response);
        setError(null);
      } else {
        setError('No Result');
        setArts(null);
      }
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

  return { arts, loading, error, fetchDataForSearch };
};

export default useSearchQuery;
