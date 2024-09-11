import { useEffect, useState } from 'react';

import { fetchPaginationData } from '../api/api';
import { ArtsInfo } from '../constants/types';

const usePaginationFetch = () => {
  const [artsPage, setArtsPage] = useState<ArtsInfo | null>(null);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [errorPage, setErrorPage] = useState<string | null>(null);

  useEffect(() => {
    fetchDataForPagination(1);
  }, []);

  const fetchDataForPagination = async (page: number) => {
    setLoadingPage(true);
    try {
      const response = await fetchPaginationData(page);
      setArtsPage(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorPage(err.message);
      } else {
        setErrorPage('An unknown error occurred');
      }
    } finally {
      setLoadingPage(false);
    }
  };

  const togglePage = (page: number) => {
    fetchDataForPagination(page);
  };

  return { artsPage, loadingPage, errorPage, togglePage };
};

export default usePaginationFetch;
