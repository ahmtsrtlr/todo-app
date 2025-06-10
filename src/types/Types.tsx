export interface TodoInitialState {
  todos: TodoType[];
  loading: boolean;
}

export interface TodoType {
  id: string;
  content: string;
  completed: boolean;
  userId: string;
  createdAt: any;
}

export interface AuthInitialState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  displayName: string;
}
