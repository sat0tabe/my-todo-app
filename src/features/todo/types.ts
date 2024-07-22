export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  deadline: Date | null; // 期限を追加
}
