export interface Task {
  id: string;
  title: string;
  completed: boolean;
  created: number;
}

export type DisplayMode = 'all' | 'active' | 'completed';
