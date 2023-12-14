import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {RootState} from './store';

interface IInitialState {
  region: number;
}

const initialState: IInitialState = {
  region: 0,
};

export const controlSlice = createSlice({
  name: 'control',
  initialState,
  reducers: {
    setRegion: (state, actions: PayloadAction<number>) => {
      state.region = actions.payload;
    },
  },
});

export const selectConrol = (state: RootState) => state.control;
export const {setRegion} = controlSlice.actions;
