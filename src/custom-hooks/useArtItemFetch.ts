import { fetchArtItemData } from '@api/api';
import { ArtInfo } from '@utils/Types/types';
import { useEffect, useState } from 'react';

const useArtItemFetch = (id: string) => {
  const [art, setArt] = useState<ArtInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDataForArtItem(id);
  }, []);

  const fetchDataForArtItem = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetchArtItemData(id);
      setArt(response);
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

  return { art, loading, error };
};

export default useArtItemFetch;
