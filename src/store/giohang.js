import { createSlice } from "@reduxjs/toolkit";

const giohang = createSlice({
  name: "giohang",
  initialState: {
    sanpham: [],
    tongtien: 0,
  },
  reducers: {
    them: (state, action) => {
      let sp = action.payload.sanpham;
      let sptt = state.sanpham.find((i) => i.id == sp.id);
      if (sptt) {
        sptt.sl += sp.sl;
        state.tongtien += sp.gia * sp.sl;
      } else {
        state.sanpham.push(sp);
        state.tongtien += sp.gia * sp.sl;
      }
    },
    tgsl: (state, action) => {
      let sp = action.payload.sanpham;
      let sptt = state.sanpham.find((i) => i.id == sp.id);
      if (sp.sl > 0) {
        let oldSl = sptt.sl;
        sptt.sl = sp.sl;
        state.tongtien += sp.gia * (sp.sl - oldSl);
      } else {
        let sptt = state.sanpham.find((i) => i.id == sp.id);
        state.tongtien -= sptt.gia * sptt.sl;
        let vt = state.sanpham.findIndex((i) => i.id == sp.id);
        state.sanpham.splice(vt, 1);
      }
    },
    xoa: (state, action) => {
      let sp = action.payload.sanpham;
      let sptt = state.sanpham.find((i) => i.id == sp.id);
      let vt = state.sanpham.findIndex((i) => i.id == sp.id);

      if (vt > -1) {
        state.tongtien -= sptt.gia * sptt.sl;
        state.sanpham.splice(vt, 1);
      }
    },
    capnhat: (state, action) => {
      let sp = action.payload.sanpham;
      let sptt = state.sanpham.find((i) => i.id == sp.id);
      if (sptt && sp.sl > 0) {
        let oldSl = sptt.sl;
        sptt.sl = sp.sl;
        state.tongtien += sp.gia * (sp.sl - oldSl);
      }
    },
  },
});

export const { them, tgsl, xoa, capnhat } = giohang.actions;
export default giohang.reducer;
