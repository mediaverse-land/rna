import { File } from "./file";

export interface Text {
  id: number;
  asset_id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  asset: {
    forkability_status: 1 | 2;
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
    eligible_for_labeling: false;
    eligible_for_audio_extraction: false;
    eligible_for_image_extraction: false;
    eligible_for_video_extraction: false;
    commenting_status: 1;
    created_at: string;
    updated_at: string;
    deleted_at: null;
    sales_volume: number;
    sales_number: number;
    views_count: number;
    thumbnails: {
      "100": string;
      "100x150": string;
      "150x100": string;
      "270x370": string;
      "525x525": string;
      "336x366": string;
      "226x226": string;
      "852x480": string;
    };
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
        thumbnails: [string];
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
