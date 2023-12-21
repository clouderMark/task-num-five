import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {IUser} from '../types/types';
import {dataApi} from './dataApi';

interface IInitialState {
  rows: IUser[];
}

const initialState: IInitialState = {
  rows: [],
};

export const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<IUser[]>) => {
      state.rows = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(dataApi.endpoints.getAllUsers.matchFulfilled, (state, {payload}) => {
      console.log(payload);
      state.rows.push(...payload);
    });
  },
});

export const selectUserList = (state: RootState) => state.userList;
export const {setRows} = userListSlice.actions;
