export interface Signin {
  id: number;
  user_id: number;
  ip: string;
  agent: string;
  request: {
    otp: string;
    cellphone: string;
  };
  created_at: string;
  updated_at: string;
}
