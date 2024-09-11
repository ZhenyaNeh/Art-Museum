import useBookmarkChange from '@custom-hooks/useBookmarkChange';
import images from '@utils/ImageStorage/ImageStorage';
import { ArtData } from '@utils/Types/types';
import React, { FC } from 'react';

import { TypesOfCard } from './CardConstructor';

interface ItemDescription {
  artData: ArtData | null;
  typesOfCard: TypesOfCard;
}

const CardDescription: FC<ItemDescription> = ({ artData, typesOfCard }) => {
  const { isFavorited, toggleFavorite } = useBookmarkChange(artData?.id);

  const handleInnerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    toggleFavorite();
  };

  return (
    <div className="contener-description">
      <div className={'card-description ' + typesOfCard}>
        <p>{artData?.title}</p>
        <p>{artData?.artist_title}</p>
        <p>{artData?.is_public_domain ? 'Public' : 'No public'}</p>
      </div>
      <div className={'card-favorites ' + typesOfCard}>
        {artData?.id && (
          <img
            onClick={(event) => handleInnerClick(event)}
            src={
              isFavorited
                ? images.bookmarkMainChecked
                : images.bookmarkMainUnchecked
            }
            alt="bookmark"
          />
        )}
      </div>
    </div>
  );
};

export default CardDescription;
