export interface User {
  username: string;
  password: string;
  email: string;
  role: string;
  _id?: string;
}

export interface ApiResponseCreate {
  success:boolean,
  message?: string,
  users?: User[]
}

export interface UserLogin{
  username: string;
  password: string;
}