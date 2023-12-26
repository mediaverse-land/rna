export interface Comment {
  id: number;
  parent_id: null;
  asset_id: number;
  user_id: number;
  body: string;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    cellphone: string;
    cellphone_verified_at: string;
    email: string;
    email_verified_at: null;
    national_id: null;
    status: number;
    source: number;
    access_token: null;
    referrer_id: null;
    created_at: string;
    updated_at: string;
    image_url?:string
  };
  replies: [];
}
