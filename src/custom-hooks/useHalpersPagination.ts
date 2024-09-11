const useHalpersPagination = () => {
  const countDisplayPagination = 4;
  const maxPageNumbers: number[] = [];

  for (let i = 1; i <= 99; i++) {
    maxPageNumbers.push(i);
  }

  const changeCurrentCountPagination = (number: number) => {
    resetVisibleDivPagination();

    const firstIndexOfPagination =
      number - (countDisplayPagination - 1) - 1 <= 0
        ? 0
        : number - (countDisplayPagination - 1) - 1;
    const lastIndexOfPagination =
      firstIndexOfPagination + countDisplayPagination - 1;

    const divs = document.getElementsByClassName('div-pagination');

    for (let i = firstIndexOfPagination; i <= lastIndexOfPagination; i++) {
      divs[i].className = 'div-pagination visible';
    }

    divs[number - 1].className = 'div-pagination visible highlight';
  };

  const resetVisibleDivPagination = () => {
    const divs = document.getElementsByClassName('div-pagination');

    for (let i = 0; i < maxPageNumbers.length; i++) {
      divs[i].className = 'div-pagination non-visible';
    }
  };

  return {
    maxPageNumbers,
    changeCurrentCountPagination,
    resetVisibleDivPagination,
  };
};

export default useHalpersPagination;
