import '@scss/art-item-page.scss';

import Loader from '@components/main-components/Loader';
import useArtItemFetch from '@custom-hooks/useArtItemFetch';
import useBookmarkChange from '@custom-hooks/useBookmarkChange';
import images from '@utils/ImageStorage/ImageStorage';
import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

type ArtItemPageParams = {
  id: string;
};

const ArtItemPage: FC = () => {
  const params = useParams<ArtItemPageParams>();
  const { art, loading, error } = useArtItemFetch(params.id ? params.id : '');
  const { isFavorited, toggleFavorite } = useBookmarkChange(art?.data.id);
  const IMG = process.env.REACT_APP_API_IMG;

  const artData = useMemo(() => art?.data, [art?.data]);
  const artConfig = useMemo(() => art?.config, [art?.config]);
  const bookmarkImage = useMemo(
    () =>
      isFavorited ? images.bookmarkMainChecked : images.bookmarkMainUnchecked,
    [isFavorited]
  );

  const handleImgClick = () => {
    toggleFavorite();
  };

  return (
    <>
      <main className="art-item-page">
        {loading ? (
          <Loader />
        ) : error ? (
          <div>Message: {error}</div>
        ) : (
          <>
            <div className="image-display">
              <img
                src={`${artConfig?.iiif_url}/${artData?.image_id}${IMG}`}
                alt="art"
              />
              <div>
                {artData?.id && (
                  <img
                    onClick={handleImgClick}
                    src={bookmarkImage}
                    alt="bookmark"
                  />
                )}
              </div>
            </div>
            <div className="description-display">
              <div className="art-info">
                <h2>{artData?.title}</h2>
                <h3>
                  <span className="highlight">{artData?.artist_title}</span>
                </h3>
                <h4>{artData?.date_display}</h4>
              </div>
              <div className="overview">
                <h2>Overview</h2>
                <ul>
                  <li>
                    <span className="highlight">Artist information: </span>
                    {artData?.artist_display}
                  </li>
                  <li>
                    <span className="highlight">Place of origin: </span>
                    {artData?.place_of_origin}
                  </li>
                  <li>
                    <span className="highlight">Dimensions sheet: </span>
                    {artData?.dimensions}
                  </li>
                  <li>
                    <span className="highlight">Credit line: </span>
                    {artData?.credit_line}
                  </li>
                  <li>{artData?.is_public_domain ? 'Public' : 'Not public'}</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default ArtItemPage;
