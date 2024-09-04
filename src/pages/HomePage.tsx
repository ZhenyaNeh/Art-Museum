import React, { FC, useEffect, useRef, useState } from 'react'
import { ArtsInfo } from '../constants/types'
import SecondaryCardItem from '../components/card-components/SecondaryCardItem'
import { useNavigate } from 'react-router-dom'
import CardDisplay from '../components/pagination-components/CardDisplay'
import Pagination from '../components/pagination-components/Pagination'
import SearchBar from '../components/search-bar-component/SearchBar'
import '../scss/home-page.scss';
import Loader from '../components/loader-component/Loader'

const HomePage: FC = () => {
  const [arts, setArts] = useState<ArtsInfo | null>(null);
  const [loading, setLoadiing] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const countDisplayCard = useRef(3);
  const navigate = useNavigate();

  const URL = process.env.REACT_APP_API_URL;
  const FIELDS = process.env.REACT_APP_API_FIELDS;
  const LIMIT = process.env.REACT_APP_API_LIMIT;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    setLoadiing(true);
    fetch(`${URL}${FIELDS}${LIMIT}`)
      .then(res => res.json())
      .then(data => clearByNullImgId(data))
    setLoadiing(false);
  }

  const clearByNullImgId = (fetchArtsOgj: ArtsInfo | null) => {
    if(fetchArtsOgj && fetchArtsOgj.data && fetchArtsOgj.config){
      const filterItems: ArtsInfo = fetchArtsOgj;
      filterItems.data = fetchArtsOgj?.data.filter((data) => data.image_id != null);
      setArts(filterItems);
    }
  }

  const lastArtIndex = currentPage * countDisplayCard.current;
  const firstArtIndex = lastArtIndex - countDisplayCard.current;
  const currentArt = arts?.data.slice(firstArtIndex, lastArtIndex);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <>
      {loading ? <Loader/> : 
      <main className='home-page'>
        <section className='title-info'>
          <div className='title'>
            <h1>Let’s Find Some <span className="highlight">Art</span> Here!</h1>
          </div>
          {arts && <SearchBar arts={arts.data} config={arts.config} />}
        </section>

        <section className="special-gallery">
          <h3>Topics for you</h3>
          <h2>Our special gallery</h2>
          <div className='gallery'>
            {arts && currentArt && <CardDisplay data={currentArt} config={arts?.config} loading={loading} />}
          </div>
          {arts &&
            <Pagination
              countDisplayCard={countDisplayCard.current}
              totalCout={arts?.data.length}
              paginate={paginate} />}
        </section>

        <section className="other-works">
          <h3>Here some more</h3>
          <h2>Other works for you</h2>
          <div className="works">
            {arts && arts.data.slice(40, 49).map((data) => (
              <SecondaryCardItem key={data.id} onCLick={(data) => navigate(`/art/${data.id}`)} artData={data} config={arts.config} />
            ))}
          </div>
        </section>
      </main>}
    </>
  )
}

export default HomePage
