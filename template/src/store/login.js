const { createSlice } = require("@reduxjs/toolkit");

const user = createSlice({
    name: 'taikhoan',
    initialState: {
        info: {},
        status: false,///Trạng thái đăng nhập
    },
    reducers: {
        dangnhap: (state, action) => {
            //Lưu thông tin đăng nhập vào store
            state.info = action.payload;
            state.status = true;
        },
        dangxuat: (state) => {
            state.info = {};
            state.status = false;
        }
    }
});

export default user.reducer;
export const {dangnhap, dangxuat} = user.actions;