export interface Member {
  id?: number;
  family_id?: number;
  family_nickname: string;
  full_Name: string;
  username: string;
  password: string;
  is_creator?: boolean;
  created_at?: Date;
}
