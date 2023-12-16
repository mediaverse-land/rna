export interface Message {
  id: number;
  user_id: number | null;
  message: string;
  created_at: string;
  updated_at: string;
}
