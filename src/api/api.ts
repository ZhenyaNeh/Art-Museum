import { ArtInfo, ArtsInfo } from '../utils/Types/types';

const URL = process.env.REACT_APP_API_URL;
const FIELDS = process.env.REACT_APP_API_FIELDS;

export const fetchFavoriteData = async (id: string): Promise<ArtInfo> => {
  const response = await fetch(`${URL}/${id}?${FIELDS}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const result: ArtInfo = await response.json();
  return result;
};

export const fetchHomeData = async (): Promise<ArtsInfo> => {
  const response = await fetch(`${URL}?${FIELDS}&limit=12`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const result: ArtsInfo = await response.json();
  return result;
};

export const fetchPaginationData = async (
  number: number
): Promise<ArtsInfo> => {
  const response = await fetch(`${URL}?${FIELDS}&page=${number}&limit=3`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const result: ArtsInfo = await response.json();
  return result;
};

export const fetchSearchData = async (
  query: string,
  isPublic: boolean | null
): Promise<ArtsInfo> => {
  const response = await fetch(
    `${URL}/search?q=${query}${isPublic ? '&query[term][is_public_domain]=true' : isPublic == null ? '' : '&query[term][is_public_domain]=false'}&${FIELDS}`
  );
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const result: ArtsInfo = await response.json();
  return result;
};

export const fetchArtItemData = async (id: string): Promise<ArtInfo> => {
  const response = await fetch(`${URL}/${id}?${FIELDS}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const result: ArtInfo = await response.json();
  return result;
};
