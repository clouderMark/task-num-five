import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {IUser} from '../types/types';

interface IInitialState {
  rows: IUser[];
}

const initialState: IInitialState = {
  rows: [],
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<IUser[]>) => {
      state.rows = action.payload;
    },
  },
});

export const selectTable = (state: RootState) => state.table;
export const {setRows} = tableSlice.actions;
