import { ArtData } from '@utils/Types/types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useDebounce from './useDebounce';
import useSearchQuery from './useSearchQuery';

type Visibility = 'visible' | 'none-visible';

const useSearchBar = () => {
  const { arts, loading, error, fetchDataForSearch } = useSearchQuery();
  const [query, setQuery] = useState<string>('');
  const navigate = useNavigate();
  const IMG = process.env.REACT_APP_API_IMG;
  const [publicDomain, setPublicDomain] = useState<boolean>(true);
  const [visibility, setVisibility] = useState<Visibility>('none-visible');
  const debouncedQuery = useDebounce(query, 500);

  const changeVisible = () => setVisibility('visible');
  const changeNoneVisible = () => setVisibility('none-visible');

  useEffect(() => {
    if (debouncedQuery) {
      fetchDataForSearch(query, publicDomain);
    }
  }, [debouncedQuery, publicDomain]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      changeVisible();
    } else {
      changeNoneVisible();
    }
  };

  const handleClickRadio = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setPublicDomain(!publicDomain);
  };

  const handleNavigate = (
    event: React.MouseEvent<HTMLLIElement>,
    data: ArtData
  ) => {
    event.stopPropagation();
    navigate(`/art/${data.id}`);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setTimeout(() => changeNoneVisible(), 100);
    }
  };

  return {
    query,
    visibility,
    publicDomain,
    arts,
    loading,
    error,
    IMG,
    handleInputChange,
    handleClickRadio,
    handleNavigate,
    handleBlur,
    changeVisible,
  };
};

export default useSearchBar;
