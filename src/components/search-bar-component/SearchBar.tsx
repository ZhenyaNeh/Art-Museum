import Loader from '@components/main-components/Loader';
import useSearchBar from '@custom-hooks/useSearchBar';
import React, { FC } from 'react';

const SearchBar: FC = () => {
  const {
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
  } = useSearchBar();

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
      <div className={`div-searchbar ${visibility}`}>
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
