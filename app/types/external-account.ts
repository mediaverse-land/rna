export interface ExternalAccount {
  id: number;
  user_id: number;
  type: 1 |number;
  // Email = title
  title: string;
  information: {
    access_token: string;
    refresh_token: string;
  };
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
