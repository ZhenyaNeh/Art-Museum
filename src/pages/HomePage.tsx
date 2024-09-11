import '@scss/home-page.scss';

import SecondaryCardItem from '@components/card-components/SecondaryCardItem';
import Loader from '@components/main-components/Loader';
import CardDisplay from '@components/pagination-components/CardDisplay';
import Pagination from '@components/pagination-components/Pagination';
import SearchBar from '@components/search-bar-component/SearchBar';
import useHomeFetch from '@custom-hooks/useHomeFetch';
import usePaginationFetch from '@custom-hooks/usePaginationFetch';
import React, { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: FC = () => {
  const { arts, loading, error } = useHomeFetch();
  const { artsPage, loadingPage, errorPage, togglePage } = usePaginationFetch();
  const navigate = useNavigate();

  const artsPageData = useMemo(() => artsPage?.data, [artsPage?.data]);
  const artsConfig = useMemo(() => artsPage?.config, [artsPage?.config]);

  const artsData = useMemo(() => arts?.data, [arts?.data]);
  const artsMainConfig = useMemo(() => arts?.config, [arts?.config]);

  return (
    <>
      <main className="home-page">
        <section className="title-info">
          <div className="title">
            <h1>
              Let’s Find Some <span className="highlight">Art</span> Here!
            </h1>
          </div>
          {arts && <SearchBar />}
        </section>

        <section className="special-gallery">
          <h3>Topics for you</h3>
          <h2>Our special gallery</h2>
          <div className="gallery">
            {loadingPage ? (
              <Loader />
            ) : errorPage ? (
              <div>Message: {errorPage}</div>
            ) : (
              artsPageData &&
              artsConfig && (
                <CardDisplay data={artsPageData} config={artsConfig} />
              )
            )}
          </div>
          {arts && <Pagination togglePage={togglePage} />}
        </section>

        <section className="other-works">
          <h3>Here some more</h3>
          <h2>Other works for you</h2>
          <div className="works">
            {loading ? (
              <Loader />
            ) : error ? (
              <div>Message: {error}</div>
            ) : (
              artsData &&
              artsMainConfig &&
              artsData.map((data) => (
                <SecondaryCardItem
                  key={data.id}
                  onCLick={() => navigate(`/art/${data.id}`)}
                  artData={data}
                  config={artsMainConfig}
                />
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
