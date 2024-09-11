import { renderHook } from '@testing-library/react-hooks';

import useHalpersPagination from '../castom-hooks/useHalpersPagination';

describe('useHalpersPagination', () => {
  let mockDivs: HTMLElement[];

  beforeEach(() => {
    mockDivs = Array.from({ length: 99 }, () => {
      const div = document.createElement('div');
      div.className = 'div-pagination non-visible';
      return div;
    });

    jest
      .spyOn(document, 'getElementsByClassName')
      .mockReturnValue(mockDivs as unknown as HTMLCollectionOf<HTMLDivElement>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with maxPageNumbers array of length 99', () => {
    const { result } = renderHook(() => useHalpersPagination());

    expect(result.current.maxPageNumbers.length).toBe(99);
  });

  it('should reset all divs to non-visible when changing pagination', () => {
    const { result } = renderHook(() => useHalpersPagination());

    result.current.resetVisibleDivPagination();

    mockDivs.forEach((div) => {
      expect(div.className).toBe('div-pagination non-visible');
    });
  });

  it('should highlight the correct divs when changing current pagination', () => {
    const { result } = renderHook(() => useHalpersPagination());

    result.current.changeCurrentCountPagination(5);

    expect(mockDivs[1].className).toBe('div-pagination visible');
    expect(mockDivs[2].className).toBe('div-pagination visible');
    expect(mockDivs[3].className).toBe('div-pagination visible');
    expect(mockDivs[4].className).toBe('div-pagination visible highlight');
  });

  it('should handle pagination number less than countDisplayPagination correctly', () => {
    const { result } = renderHook(() => useHalpersPagination());

    result.current.changeCurrentCountPagination(1);

    expect(mockDivs[0].className).toBe('div-pagination visible highlight');
    expect(mockDivs[1].className).toBe('div-pagination visible');
    expect(mockDivs[2].className).toBe('div-pagination visible');
    expect(mockDivs[3].className).toBe('div-pagination visible');
  });
});
