import React, { FC, useEffect, useRef, useState } from 'react'
import arrowRight from '../../assets/img/arrow-right.svg'

interface PaginationProps {
    countDisplayCard: number;
    totalCout: number;
    paginate: (pageNumber: number) => void;
}

const Pagination: FC<PaginationProps> = ({ countDisplayCard, totalCout, paginate }) => {
    const [currentDisplay, setCurrentDisplay] = useState(1);
    const countDisplayPagination = useRef(4);
    const pageNumbers = [];

    useEffect(() => {
        changeCurrentDisplay(currentDisplay);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    for (let i = 1; i <= Math.ceil(totalCout / countDisplayCard); i++) {
        pageNumbers.push(i);
    }

    const changeCurrentDisplay = (number: number) => {
        changeCurrentCountPagination(number);
        setCurrentDisplay(number);
        paginate(number);
    }

    const changeCurrentCountPagination = (number: number) => {
        resetVisibleDivPagination();

        const firstIndexOfPagination = ((number - (countDisplayPagination.current - 1) - 1) <= 0) ? 0 : (number - (countDisplayPagination.current - 1) - 1);
        const lastIndexOfPagination = firstIndexOfPagination + countDisplayPagination.current - 1;

        const divs = document.getElementsByClassName('div-pagination');

        for (let i = firstIndexOfPagination; i <= lastIndexOfPagination; i++) {
            divs[i].className = 'div-pagination visible';
        }

        divs[number - 1].className = 'div-pagination visible highlight';
    }

    const resetVisibleDivPagination = () => {
        const divs = document.getElementsByClassName('div-pagination');

        for (let i = 0; i < pageNumbers.length; i++) {
            divs[i].className = 'div-pagination non-visible';
        }
    }

    return (
        <div className="pagination">
            {/* {currentDisplay != 1 ? <div className='arrow-right' onClick={() => changeCurrentDisplay(currentDisplay - 1)}><img src={arrowRight} alt="arrow" /></div> : ' '} */}
            {pageNumbers.map(number => (
                <div key={number} className='div-pagination visible' onClick={() => changeCurrentDisplay(number)}>{number}</div>
            ))}
            {currentDisplay !== pageNumbers.at(-1) ? <div className='arrow-right' onClick={() => changeCurrentDisplay(currentDisplay + 1)}><img src={arrowRight} alt="arrow" /></div> : ' '}
        </div>
    )
}

export default Pagination
