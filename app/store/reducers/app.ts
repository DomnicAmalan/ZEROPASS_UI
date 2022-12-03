import { createSlice } from "@reduxjs/toolkit";

const AppSlice = createSlice({
  name: "app",
  initialState: {
    google: {
      linking: false,
      linked: false,
      minting: false,
      minted: false
    },
    captcha: {
      linking: false,
      linked: false,
      minting: false,
      minted: false
    },
  } as any,
  reducers: {
    setPayload: (state, action) => {
      state[action?.payload?.property] = {...state[action?.payload?.property], ...action?.payload}
    },
    minting: (state, action) => {
      state[action?.payload?.property].minted = false
      state[action?.payload?.property].minting = true 
    },
    mintingFailed: (state, action) => {
      state[action?.payload?.property].minted = false
      state[action?.payload?.property].minting = false
    },
    mintingSuccess: (state, action) => {
      state[action?.payload?.property].minted = true
      state[action?.payload?.property].minting = false
    },
  },
});

export default AppSlice.reducer;

export const {
  setPayload,
  minting,
  mintingFailed,
  mintingSuccess
} = AppSlice.actions;
