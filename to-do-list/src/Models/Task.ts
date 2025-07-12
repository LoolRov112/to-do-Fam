export interface Task {
  id?: string;
  family_id: number;
  user_id: number;
  name: string;
  description: string;
  due_date: string;
  done: boolean;
}
