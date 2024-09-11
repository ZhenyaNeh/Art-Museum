import { ArtConfig, ArtData } from '@utils/Types/types';
import React, { FC } from 'react';

import CardDescription from './CardDescription';

export enum TypesOfCard {
  main = 'main',
  secondary = 'secondary',
}

interface ArtItemInfo {
  artData: ArtData;
  config: ArtConfig;
  onCLick: (art: ArtData) => void;
}

const CardConstructor = (
  typesOfCard: TypesOfCard,
  displayName: string
): FC<ArtItemInfo> => {
  const CardBase: FC<ArtItemInfo> = ({ artData, config, onCLick }) => {
    const imgUrl = `${config.iiif_url}/${artData.image_id}/full/843,/0/default.jpg`;

    return (
      <div
        className={'card-item ' + typesOfCard}
        onClick={() => onCLick(artData)}
      >
        <div className="image-box">
          <img src={imgUrl} alt="art-img" />
        </div>
        <CardDescription artData={artData} typesOfCard={typesOfCard} />
      </div>
    );
  };

  CardBase.displayName = displayName;
  return CardBase;
};

export default CardConstructor;
