export interface File {
  id: number;
  asset_id: number;
  user_id: number;
  storage: string;
  extension: string;
  description: string;
  details: {
    name: string;
    audio: [];
    video: {
      lossless: boolean;
      dataformat: string;
      resolution_x: number;
      resolution_y: number;
      bits_per_sample: number;
      compression_ratio: number;
      pixel_aspect_ratio: number;
    };
    encoding: string;
    filesize: number;
    avdataend: number;
    mime_type: string;
    fileformat: string;
    thumbnails: string[];
    avdataoffset: number;
  };
  created_at: string;
  updated_at: string;
  url: string;
  thumbnails: {
    '100': string;
    '100x150': string;
    '150x100': string;
    '270x370': string;
    '852x480': string;
  };
}
