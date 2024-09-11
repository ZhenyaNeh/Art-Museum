import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useSearchQuery from '../../castom-hooks/useSearchQuery';
import { ArtData } from '../../constants/types';
import Loader from '../main-components/Loader';

type Visibility = 'visible' | 'none-visible';

const SearchBar: FC = () => {
  const { arts, loading, error, fetchDataForSearch } = useSearchQuery();
  const [query, setQuery] = useState<string>('');
  const navigate = useNavigate();
  const IMG = process.env.REACT_APP_API_IMG;
  const [publicDomain, setPublicDomain] = useState<boolean>(true);
  const [visibility, setVisibility] = useState<Visibility>('none-visible');

  const changeVisible = () => setVisibility('visible');
  const changeNoneVisible = () => setVisibility('none-visible');

  useEffect(() => {
    fetchDataForSearch(query, publicDomain);
  }, [query, publicDomain]);

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

  return (
    <div className="search-bar" onBlur={handleBlur}>
      <input
        className="search-input"
        name="search-input"
        type="text"
        placeholder="Search Art, Artist, Work..."
        value={query}
        onChange={handleInputChange}
        onFocus={changeVisible}
      />
      <div className={`filter-list-style ${visibility}`}>
        <input
          className="radio-input"
          name="radio-input"
          type="radio"
          checked={publicDomain}
          onChange={(event) => event.stopPropagation()}
          onClick={(event) => handleClickRadio(event)}
        />
        <span>{publicDomain ? 'Public' : 'No public'}</span>
      </div>
      <div className={`div-searchbar `}>
        <ul>
          {loading ? (
            <Loader />
          ) : error ? (
            <div>Message: {error}</div>
          ) : (
            arts &&
            query &&
            arts?.data.map((data) => (
              <li
                key={data?.id}
                onClick={(event) => handleNavigate(event, data)}
              >
                <div className="desc-img">
                  <img
                    src={`${arts.config.iiif_url}/${data.image_id}${IMG}`}
                    alt="image-search"
                  />
                </div>
                <div className="decs-contener">
                  <div className="desc-text">
                    <p>{data.title}</p>
                    <p>{data.artist_title ? data.artist_title : 'N.d'}</p>
                  </div>
                  <div className="desc-time">
                    <p>
                      <strong>{data.date_display}</strong>
                    </p>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
