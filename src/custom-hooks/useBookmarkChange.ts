import { LocalStorageManager } from '@utils/localStorage/localStorage';
import { useEffect, useState } from 'react';

const useBookmarkChange = (id: number | undefined) => {
  const localStorageManager = new LocalStorageManager();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (id) {
      setIsFavorited(localStorageManager.getFavorites().includes(`${id}`));
    }
  }, [id, localStorageManager]);

  const toggleFavorite = () => {
    if (isFavorited) {
      localStorageManager.removeFromFavorites(`${id}`);
      setIsFavorited(false);
    } else {
      localStorageManager.saveToFavorites(`${id}`);
      setIsFavorited(true);
    }
  };

  return { isFavorited, toggleFavorite };
};

export default useBookmarkChange;
