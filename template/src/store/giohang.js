const { createSlice } = require("@reduxjs/toolkit");

const giohang = createSlice({
    name: 'giohang',
    initialState: {
        //id - img - name - price - quantity
        sanpham: [],
        tongtien: 0
    },
    reducers: {
        //Hành động thêm vào giỏ hàng
        them: (state, action) => {
            let sp = action.payload.sanpham;
            let sptt = state.sanpham.find((i) => i.id == sp.id);
            if(sptt){
                //Sản phẩm đã có trong giỏ hàng
                sptt.sl += sp.sl;
                state.tongtien = sp.gia * sp.sl;
            }
            else{
                //Sản phẩm không có trong giỏ hàng
                state.sanpham.push(sp);
                state.tongtien = sp.gia * sp.sl;
            }
            
        },
        //Tăng giảm số lượng sản phẩm trong giỏ hàng
        tgsl: (state, action) => {
            let sp = action.payload.sanpham;
            let sptt = state.sanpham.find((i) => i.id == sp.id);
            if(sp.sl > 0){
                sptt.sl = sp.sl;
                state.tongtien += sp.gia * sp.sl;
            }
            else{
                let sptt = state.sanpham.find((i) => i.id == sp.id);
                state.tongtien -= sptt.gia * sptt.sl;
                let vt = state.sanpham.indexOf((i) => i.id == sp.id);
                state.sanpham.splice(vt,1);
            }
            
        },
        //Xóa sản phẩm trong giỏ hàng
        xoa: (state, action) => {

            let sp = action.payload.sanpham;
            let sptt = state.sanpham.find((i) => i.id == sp.id);

            let vt = -1;
            for(let i = 0; i < state.sanpham.length; i++){
                if(state.sanpham[i].id == sp.id){
                    vt = i;
                    break;
                }
            }
            
            if(vt > -1){
                state.tongtien -= sptt.gia * sptt.sl;
                state.sanpham.splice(vt,1);
            }
            
        }
    }
})

export const {them, tgsl, xoa} = giohang.actions;
export default giohang.reducer;