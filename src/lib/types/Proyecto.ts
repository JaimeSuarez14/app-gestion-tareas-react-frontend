import type { TareaState } from "./Tarea";
import type { User } from "./User";

export interface Proyecto {
  _id: string;
  name: string;
  description: string;
  userBy: User;
  state: TareaState;
  createdAt: string;
  updatedAt: string;
}