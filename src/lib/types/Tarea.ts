import type { User } from "./User";

export type TareaState = 'pending' | 'completed' | 'canceled';

export interface Tarea {
  _id: string;
  name: string;
  description: string;
  userBy: string;
  imageBy: string | null;
  state: TareaState;
  createdAt: string;
  updatedAt: string;
}

export interface TareaDetails {
  _id: string;
  name: string;
  description: string;
  userBy: User;
  imageBy: {
    url: string
  } | null;
  state: TareaState;
  createdAt: string;
  updatedAt: string;
}
