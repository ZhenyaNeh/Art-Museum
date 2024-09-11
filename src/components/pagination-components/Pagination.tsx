import React, { FC, useEffect, useState } from 'react';

import useHalpersPagination from '../../castom-hooks/useHalpersPagination';
import images from '../../utils/ImageStorage/ImageStorage';

interface PaginationProps {
  togglePage: (pageNum: number) => void;
}

const Pagination: FC<PaginationProps> = ({ togglePage }) => {
  const [currentDisplay, setCurrentDisplay] = useState(1);
  const { maxPageNumbers, changeCurrentCountPagination } =
    useHalpersPagination();

  useEffect(() => {
    changeCurrentDisplay(currentDisplay);
    //eslint-disable-next-line
  }, [])

  const changeCurrentDisplay = (number: number) => {
    changeCurrentCountPagination(number);
    setCurrentDisplay(number);
    togglePage(number);
  };

  return (
    <div className="pagination">
      {maxPageNumbers.map((number) => (
        <div
          key={number}
          className="div-pagination visible"
          onClick={() => changeCurrentDisplay(number)}
        >
          {number}
        </div>
      ))}
      {currentDisplay !== maxPageNumbers.at(-1) ? (
        <div
          className="arrow-right"
          onClick={() => changeCurrentDisplay(currentDisplay + 1)}
        >
          <img src={images.arrowRight} alt="arrow" />
        </div>
      ) : (
        ' '
      )}
    </div>
  );
};

export default Pagination;
