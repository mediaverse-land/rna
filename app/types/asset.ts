export interface Asset {
  id: number;
  user_id: number;
  thumbnail_id: number;
  file_id: number;
  parent_id?: any | null;
  name: string;
  type: 1 | 2 | 3 | 4;
  plan: number;
  status: number;
  price: number;
  subscription_period: 3;
  lat?: any | null;
  lng?: any | null;
  description: string;
  created_by: number;
  eligible_for_labeling: boolean;
  eligible_for_audio_extraction: boolean;
  eligible_for_image_extraction: boolean;
  eligible_for_video_extraction: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: any | null;
  commenting_status: number;
  views_count: number;
  sales_volume: number;
  sales_number: number;
  thumbnail: null | {
    id: number;
    asset_id: number;
    user_id: number;
    storage: 'public' | number;
    extension: 'png' | 'jpg' | any;
    description: {
      name: string;
      filesize: number;
      avdataoffset: number;
      avdataend: number;
      fileformat: 'png' | 'jpg' | any;
      mime_type: 'image/png' | any;
      encoding: 'UTF-8' | any;
      video: {
        dataformat: 'png' | any;
        lossless: boolean;
        resolution_x: number;
        resolution_y: number;
        bits_per_sample: number;
        compression_ratio: number;
      };
      audio: [];
      thumbnails: {
        '100': string;
        '100x150': string;
        '150x100': string;
        '270x370': string;
        '852x480': string;
      };
    };
    created_at: string;
    updated_at: string;
    url: string;
    thumbnails: Record<string, string>[];
  };
}
