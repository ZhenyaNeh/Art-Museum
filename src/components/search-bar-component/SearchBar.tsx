import React, { FC, useState } from 'react'
import { ArtConfig, ArtData } from '../../constants/types';
import { useNavigate } from 'react-router-dom';
//import loop from '../../assets/img/loop.svg'

interface SearchBarProps {
  arts: ArtData[];
  config: ArtConfig;
}

const SearchBar: FC<SearchBarProps> = ({ arts, config }) => {
  const [query, setQuery] = useState<string>('');
  const [visibilityClassName, setVisibilityClassName] = useState<'div-searchbar visible' | 'div-searchbar none-visible'>('div-searchbar none-visible');
  const navigate = useNavigate();
  const IMG = process.env.REACT_APP_API_IMG;

  const filterArts = arts.filter(data => {
    const searchTerms = query.toLowerCase().split(' ').filter(term => term);

    return searchTerms.every(term =>
      (data.title && data.title.toLowerCase().includes(term)) ||
      (data.artist_title && data.artist_title.toLowerCase().includes(term))
    );
  });

  const changeClassNameVisible = () => setVisibilityClassName('div-searchbar visible');
  const changeClassNameNoneVisible = () => {
    setTimeout(() => {
      setVisibilityClassName('div-searchbar none-visible');
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      changeClassNameVisible();
    } else {
      changeClassNameNoneVisible();
    }
  };

  const handleNavigate = (event: React.MouseEvent<HTMLLIElement>, data: ArtData) => {
    event.stopPropagation();
    navigate(`/art/${data.id}`);
  }

  return (
    <div className="search-bar">
      {/* <img className='img-in-searchbar' src={loop} alt="loop" /> */}
      <input
        type="text"
        placeholder="Search Art, Artist, Work..."
        value={query}
        onChange={handleInputChange}
        onFocus={ query ? changeClassNameVisible : changeClassNameNoneVisible}
        onBlur={changeClassNameNoneVisible}
      />
      <div className={visibilityClassName}>
        <ul>
          {query && filterArts.map((data, index) => (
            <li key={index} onClick={(event) => handleNavigate(event, data)}>
              <div className='desc-img'>
                <img src={`${config.iiif_url}/${data.image_id}${IMG}`} alt="image-search" />
              </div>

              <div className='decs-contener'>
                <div className='desc-text'>
                  <p>{data.title}</p>
                  <p>{data.artist_title ? data.artist_title : 'N.d'}</p>

                </div>
                <div className='desc-time'>
                  <p><strong>{data.date_display}</strong></p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchBar
