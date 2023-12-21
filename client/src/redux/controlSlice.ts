import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {generateRandomValue} from '../components/bar/seedInput/generateRandomValue';

interface IInitialState {
  region: number;
  errors: number;
  seed: number;
  waitInputChange: boolean;
}

const initialState: IInitialState = {
  region: 0,
  errors: 0,
  seed: generateRandomValue(),
  waitInputChange: false,
};

export const setInputDelay = createAsyncThunk('input/set', () => {
  const timeout = 4000;

  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), timeout);
  });
});

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
    setSeed: (state, actions: PayloadAction<number>) => {
      state.seed = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setInputDelay.pending, (state) => {
        state.waitInputChange = true;
      })
      .addCase(setInputDelay.fulfilled, (state) => {
        state.waitInputChange = false;
      });
  },
});

export const selectConrol = (state: RootState) => state.control;
export const {setRegion, setErrors, handleBlurErrors, setSeed} = controlSlice.actions;
