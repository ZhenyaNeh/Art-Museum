export interface ArtData {
  id: number;
  title: string;
  date_display: string;
  artist_display: string;
  place_of_origin: string;
  dimensions: string;
  credit_line: string;
  is_public_domain: boolean;
  artist_title: string;
  image_id: string;
}

export interface ArtConfig {
  iiif_url: string;
}

export interface ArtsInfo {
  data: ArtData[];
  config: ArtConfig;
}

export interface ArtInfo {
  data: ArtData;
  config: ArtConfig;
}

// export interface Arts {
//     arts: ArtsInfo,
// }
