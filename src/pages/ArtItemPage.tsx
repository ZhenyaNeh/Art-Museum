import React, { FC, useEffect, useState } from 'react'
import { ArtConfig, ArtData } from '../constants/types'
import unfavorites from '../assets/img/bookmark2.svg'
import favorites from '../assets/img/bookmark3.svg'
import { useParams } from 'react-router-dom'
import { useArtContext } from '../App'
import '../scss/art-item-page.scss'

interface ItemDescription {
  data: ArtData,
  config: ArtConfig
}

type ArtItemPageParams = {
  id: string;
}

const ArtItemPage: FC = () => {
  const [artItem, setArtItem] = useState<ItemDescription | null>(null);
  const params = useParams<ArtItemPageParams>();
  const { favoriteArtworks, toggleFavorite } = useArtContext();
  
  const URL = process.env.REACT_APP_API_URL;
  const FIELDS = process.env.REACT_APP_API_FIELDS;
  const IMG = process.env.REACT_APP_API_IMG;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    fetch(`${URL}/${params.id}${FIELDS}`)
      .then(res => res.json())
      .then(data => setArtItem(data))
  }

  return (
    <>
      <main className='art-item-page'>
        <div className='image-display'>
          <img src={`${artItem?.config.iiif_url}/${artItem?.data?.image_id}${IMG}`} alt="art" />
          <div>
          {artItem?.data?.id &&
          <img
            onClick={() => toggleFavorite(artItem?.data?.id)}
            src={favoriteArtworks.includes(artItem?.data?.id) ? favorites : unfavorites}
            alt="bookmark" />}
          </div>
        </div>
        <div className='description-display'>
          <div className='art-info'>
            <h2>{artItem?.data?.title}</h2>                                             {/*  title  */}
            <h3><span className="highlight">{artItem?.data?.artist_title}</span></h3>   {/*  author  */}
            <h4>{artItem?.data?.date_display}</h4>                                      {/*  year  */}
          </div>
          <div className='overview'>
            <h2>Overview</h2>
            <ul>
              <li><span className="highlight">Artist information: </span>{artItem?.data?.artist_display}</li>
              <li><span className="highlight">Place of origin: </span>{artItem?.data?.place_of_origin}</li>     {/*  Artist nacionality  */}
              <li><span className="highlight">Dimensions sheet: </span>{artItem?.data?.dimensions}</li>         {/*  Dimensions Sheet  */}
              <li><span className="highlight">Credit line: </span>{artItem?.data?.credit_line}</li>             {/*  Credit line  */}
              <li>{artItem?.data?.is_public_domain ? 'Public' : 'Not public'}</li>                              {/*  public  */}
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}

export default ArtItemPage
