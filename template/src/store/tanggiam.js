const { createSlice } = require("@reduxjs/toolkit");

const tanggiamSlice = createSlice({
    name: 'tanggiam',//Tên
    initialState: { value: 0}, //Giá trị ban đầu
    //hành động
    reducers:{
        tang: (state) => {
            state.value += 1;
        },
        giam: (state) => {
            state.value -= 1;
        }
    }
});

export const {tang, giam} = tanggiamSlice.actions;
export default tanggiamSlice.reducer;