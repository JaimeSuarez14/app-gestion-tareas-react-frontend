import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

const initialState = {
  id: null,
  username:null,
  role: null
}

const userSlice =  createSlice({
  name: "user",
  initialState,
  reducers:{
    login: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.user;
      state.role = action.payload.role;
    },
    logout : state => {
      state.username = null;
      state.id = null;
      state.role =  null
    }
  }
})

export const {login, logout} =  userSlice.actions;
export const useSelectUser = (state: RootState) => state;
export default userSlice.reducer;