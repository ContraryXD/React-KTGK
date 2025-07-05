import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "taikhoan",
  initialState: {
    info: {},
    status: false,
    user: null,
  },
  reducers: {
    dangnhap: (state, action) => {
      state.info = action.payload;
      state.user = action.payload;
      state.status = true;
    },
    dangxuat: (state) => {
      state.info = {};
      state.user = null;
      state.status = false;
    },
    hydrate: (state, action) => {
      if (action.payload) {
        state.info = action.payload;
        state.user = action.payload;
        state.status = true;
      }
    },
  },
});

export default user.reducer;
export const { dangnhap, dangxuat, hydrate } = user.actions;
