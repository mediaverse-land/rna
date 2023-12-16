import { File } from './file';

export interface Sound {
  id: number;
  asset_id: number;
  name: string;
  type: number;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  asset: {
    id: number;
    user_id: number;
    thumbnail_id: number;
    file_id: number;
    parent_id: null;
    type: number;
    plan: number;
    status: number;
    price: number;
    subscription_period: number;
    lat: null;
    lng: null;
    source: number;
    eligible_for_labeling: boolean;
    eligible_for_audio_extraction: boolean;
    eligible_for_image_extraction: boolean;
    eligible_for_video_extraction: boolean;
    commenting_status: number;
    created_at: string;
    updated_at: string;
    deleted_at: null;
    sales_volume: number;
    sales_number: number;
    views_count: number;
    thumbnails: {
      '1080x1080': string;
      '648x651': string;
      '525x525': string;
      '523x304': string;
      '340x220': string;
      '348x351': string;
      '336x366': string;
      '226x226': string;
    };
    forkability_status: 1 | 2;
    thumbnail: {
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
          lossless: false;
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
    };
    tags: [];
    parent: null;
    children: [];
    file: File;
    user: {
      id: number;
      username: string;
      image: string;
      image_url: string;
    };
  };
}
