import { Wallet } from './wallet';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  cellphone: string;
  cellphone_verified_at: Date;
  email: string;
  email_verified_at: Date;
  national_id: string | number;
  status: number;
  referrer_id: number;
  created_at: Date;
  updated_at: Date;
  wallets: Wallet[];
  referrer: any;
  financial_records: any;
  addresses: any;
  operator: any;
}
