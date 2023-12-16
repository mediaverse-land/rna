export interface Transaction {
  id: number;
  value: number;
  last_balance: number;
  description: string;
  relation_type: number;
  relation_id: number;
  user_id: number;
  wallet_id: number;
  created_at: string;
  updated_at: string;
}
