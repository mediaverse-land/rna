export interface Live {
  id: number;
  title: string ;
  type: number;
  link: string;
  thumbnail_id: number;
  language: string;
  country: string;
  description: null;
  recording_status: number;
  availability_status: number;
  details: {
    record_length: string;
  };
  created_at: string;
  updated_at: string;
  thumbnail:
  string,
    file: {
    id: number;
    user_id: number;
    type: number;
    storage: string;
    path: string;
    extension: string;
    description: string;
    created_at: string;
    updated_at: string;
    url: string;
  };
}
