import React, { FC } from 'react'
import { ArtData } from '../../constants/types'
import { TypesOfCard } from './CardConstructor'
import unfavorites from '../../assets/img/bookmark2.svg'
import favorites from '../../assets/img/bookmark3.svg'
import { useArtContext } from '../../App'

interface ItemDescription {
  artData: ArtData | null,
  typesOfCard: TypesOfCard
}

const CardDescription: FC<ItemDescription> = ({ artData, typesOfCard }) => {
  const { favoriteArtworks, toggleFavorite } = useArtContext();

  const handleInnerClick = (event: React.MouseEvent<HTMLDivElement>, number: number) => {
    event.stopPropagation(); 
    toggleFavorite(number);
  };

  return (
    <div className='contener-description'>
      <div className={"card-description " + typesOfCard}>
        <p>{artData?.title}</p>
        <p>{artData?.artist_title}</p>
        <p>{artData?.is_public_domain ? 'Public' : 'Nopublic'}</p>
      </div>
      <div className={"card-favorites " + typesOfCard}>
        {artData?.id &&
          <img
            onClick={(event) => handleInnerClick(event, artData?.id)}
            src={favoriteArtworks.includes(artData?.id) ? favorites : unfavorites}
            alt="bookmark" />}
      </div>
    </div>
  )
}

export default CardDescription
