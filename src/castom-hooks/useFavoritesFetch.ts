import { useEffect, useState } from 'react';

import { fetchFavoriteData } from '../api/api';
import { ArtInfo, ArtsInfo } from '../constants/types';
import { LocalStorageManager } from '../utils/localStorage/localStorage';

const useFavoritesFetch = () => {
  const localStorageManager = new LocalStorageManager();
  const [arts, setArts] = useState<ArtsInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (localStorageManager.getFavorites().length != 0) {
      fetchDataForFavorites();
    } else {
      setLoading(false);
      setError('Dosent has element');
    }
    // eslint-disable-next-line
  }, []);

  const fetchDataForFavorites = async () => {
    setLoading(true);
    try {
      const favoriteIds: string[] = localStorageManager.getFavorites();

      const fetchResult: ArtInfo[] = await Promise.all(
        favoriteIds.map((id: string) => fetchFavoriteData(id))
      );

      const results = convertToArtsInfo(fetchResult);

      setTimeout(() => setArts(results), 500);
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

  const convertToArtsInfo = (artInfoArray: ArtInfo[]): ArtsInfo => {
    const data = artInfoArray.map((artInfo) => artInfo.data);
    const config = artInfoArray[0]?.config || {};

    return {
      data,
      config,
    };
  };

  return { arts, loading, error };
};

export default useFavoritesFetch;
