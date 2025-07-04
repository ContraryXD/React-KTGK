const { createSlice } = require("@reduxjs/toolkit");

const giohang = createSlice({
    name: 'giohang',
    initialState: {
        //id - img - name - price - quantity
        sanpham: [],
        tongtien: 0,
        themsanpham: false,
        tenspmoi: '',
    },
    reducers: {
        //Hành động thêm vào giỏ hàng
        them: (state, action) => {
            let sp = action.payload.sanpham;
            let sptt = state.sanpham.find((i) => i.id == sp.id);
            
            if(sptt){
                //Sản phẩm đã có trong giỏ hàng
                sptt.sl += sp.sl;
                state.tongtien += sp.gia * sp.sl;
            }
            else{
                //Sản phẩm không có trong giỏ hàng
                state.sanpham.push(sp);
                state.tongtien += sp.gia * sp.sl;
            }
            //Thông báo thêm sản phẩm
            state.themsanpham = true;
            state.tenspmoi = sp.ten;
        },
        //Tăng giảm số lượng sản phẩm trong giỏ hàng
        tgsl: (state, action) => {
            let sp = action.payload.sanpham;
            let sptt = state.sanpham.find((i) => i.id == sp.id);
            
            if(sp.sl > 0){
                state.tongtien += sp.gia * (sp.sl - sptt.sl);
                sptt.sl = sp.sl;
            }
            else{
                let tam =  state.tongtien - (sptt.gia * (sptt.sl - sp.sl));
                state.tongtien = tam < 0? 0: tam;
                
                let vt = -1;
                //Lấy vị trí sản phẩm cần xóa trong giỏ hàng
                for(let i = 0; i < state.sanpham.length; i++){
                    if(state.sanpham[i].id == sp.id){
                        vt = i;
                        break;
                    }
                }
                if(vt > -1){
                    state.sanpham.splice(vt,1);
                }
            }
            
        },
        //Xóa sản phẩm trong giỏ hàng
        xoa: (state, action) => {
            //Lấy thông tin sản phẩm cần xóa
            let sp = action.payload.sanpham;
            //Tìm thông tin sản phẩm cần xóa trong giỏ hàng
            let sptt = state.sanpham.find((i) => i.id == sp.id);

            let vt = -1;
            //Lấy vị trí sản phẩm cần xóa trong giỏ hàng
            for(let i = 0; i < state.sanpham.length; i++){
                if(state.sanpham[i].id == sp.id){
                    vt = i;
                    break;
                }
            }
            
            if(vt > -1){
                //Cập nhật lại tổng tiền khi xóa sản phẩm
                state.tongtien -= sptt.gia * sptt.sl;
                //Xóa sản phẩm khỏi giỏ hàng
                state.sanpham.splice(vt,1);
            }
            
        },

        tdtttb: (state) => {
            state.themsanpham = false;
            state.tenspmoi = '';
        }
    }
})

export const {them, tgsl, xoa, tdtttb} = giohang.actions;
export default giohang.reducer;