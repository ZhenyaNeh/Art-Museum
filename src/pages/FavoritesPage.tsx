import React, { FC, useEffect, useState } from 'react'
import { ArtData, ArtsInfo } from '../constants/types'
import SecondaryCardItem from '../components/card-components/SecondaryCardItem'
import bookmark from '../assets/img/bookmark2.svg'
import { useNavigate } from 'react-router-dom'
import '../scss/favorite-page.scss'
import { useArtContext } from '../App'

// interface ItemDescription {
//   data: ArtData,
//   config: ArtConfig
// }

const FavoritesPage: FC = () => {
  const [arts, setMyItem] = useState<ArtsInfo | null>(null);
  const navigate = useNavigate();
  const { favoriteArtworks } = useArtContext();
  const favoriteListWorks: ArtData[] | undefined = arts?.data.filter(artwork => favoriteArtworks.includes(artwork.id));

  const URL = process.env.REACT_APP_API_URL;
  const FIELDS = process.env.REACT_APP_API_FIELDS;
  const LIMIT = process.env.REACT_APP_API_LIMIT;


  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const fetchData = () => {
  //   fetch(`${URL}${''}${FIELDS}`)
  //     .then(res => res.json())
  //     .then(data => setMyItem(data))
  // }
  
  const fetchData = () => {
    fetch(`${URL}${FIELDS}${LIMIT}`)
      .then(res => res.json())
      .then(data => setMyItem(data))
  }


  return (
    <>
      <main className='favorite-page'>
        <section className='title-info'>
          <div className='title'>
            <h1>Here are your<span className="highlight"><img className='imgBookmark' src={bookmark} alt="" /> Favorites</span></h1>
          </div>
        </section>

        <section className="favorite-art">
          <h3>Saved by you</h3>
          <h2>Your favorites list</h2>
          <div className="favorite-art-list">
            {arts && favoriteListWorks && favoriteListWorks.map((data) => (
              <SecondaryCardItem key={data.id} onCLick={(data) => navigate(`/favorites/${data.id}`)} artData={data} config={arts.config} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

export default FavoritesPage
