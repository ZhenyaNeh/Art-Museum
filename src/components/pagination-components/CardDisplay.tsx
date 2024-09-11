import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ArtConfig, ArtData } from '../../constants/types';
import MainCardItem from '../card-components/MainCardItem';

interface CardDisplayProps {
  data: ArtData[];
  config: ArtConfig;
}

const CardDisplay: FC<CardDisplayProps> = ({ data, config }) => {
  const navigate = useNavigate();

  return (
    <>
      {data &&
        data.map(
          (data) =>
            data.image_id && (
              <MainCardItem
                key={data.id}
                onCLick={(data) => navigate(`/art/${data.id}`)}
                artData={data}
                config={config}
              />
            )
        )}
    </>
  );
};

export default CardDisplay;
