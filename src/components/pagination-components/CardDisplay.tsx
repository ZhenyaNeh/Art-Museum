import { FC } from 'react'
import { ArtConfig, ArtData } from '../../constants/types'
import { useNavigate } from 'react-router-dom';
import MainCardItem from '../card-components/MainCardItem';

interface CardDisplayProps {
  data: ArtData[];
  config: ArtConfig;
  loading: boolean;
}

const CardDisplay: FC<CardDisplayProps> = ({ data, config, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return <h2>Loading........</h2>
  }

  return (
    <>
      {data && data.map((data) => (
        data.image_id && <MainCardItem key={data.id} onCLick={(data) => navigate(`/art/${data.id}`)} artData={data} config={config} />
      ))}
    </>
  )
}

export default CardDisplay
