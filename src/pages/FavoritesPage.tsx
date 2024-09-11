import '../scss/favorite-page.scss';

import React, { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import useFavoritesFetch from '../castom-hooks/useFavoritesFetch';
import SecondaryCardItem from '../components/card-components/SecondaryCardItem';
import Loader from '../components/main-components/Loader';
import images from '../utils/ImageStorage/ImageStorage';

const FavoritesPage: FC = () => {
  const { arts, loading, error } = useFavoritesFetch();
  const navigate = useNavigate();

  const favoriteArtsData = useMemo(() => arts?.data, [arts?.data]);
  const favoriteArtsConfig = useMemo(() => arts?.config, [arts?.config]);

  return (
    <>
      <main className="favorite-page">
        <section className="title-info">
          <div className="title">
            <h1>
              Here are your
              <span className="highlight">
                <img
                  className="imgBookmark"
                  src={images.bookmarkMainUnchecked}
                  alt="Bookmark"
                />
                Favorites
              </span>
            </h1>
          </div>
        </section>

        <section className="favorite-art">
          <h3>Saved by you</h3>
          <h2>Your favorites list</h2>
          <div className="favorite-art-list">
            {loading ? (
              <Loader />
            ) : error ? (
              <div>Message: {error}</div>
            ) : (
              favoriteArtsData &&
              favoriteArtsConfig &&
              favoriteArtsData.map((data) => (
                <SecondaryCardItem
                  key={data.id}
                  onCLick={() => navigate(`/favorites/${data.id}`)}
                  artData={data}
                  config={favoriteArtsConfig}
                />
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default FavoritesPage;
