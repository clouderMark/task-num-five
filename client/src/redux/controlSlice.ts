import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {RootState} from './store';

interface IInitialState {
  region: number;
  errors: number;
}

const initialState: IInitialState = {
  region: 0,
  errors: 0,
};

export const controlSlice = createSlice({
  name: 'control',
  initialState,
  reducers: {
    setRegion: (state, actions: PayloadAction<number>) => {
      state.region = actions.payload;
    },
    setErrors: (state, actions: PayloadAction<number>) => {
      state.errors = actions.payload;
    },
    handleBlurErrors: (state) => {
      if (state.errors < 0) {
        state.errors = 0;
      } else if (state.errors > 1000) {
        state.errors = 1000;
      }
    },
  },
});

export const selectConrol = (state: RootState) => state.control;
export const {setRegion, setErrors, handleBlurErrors} = controlSlice.actions;
