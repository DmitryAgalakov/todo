export interface Job {
  id: string;
  title: string;
  description: string;
  created: number;
  updated: number;
  completed: boolean;
}

export type DisplayMode = 'all' | 'active' | 'completed';
