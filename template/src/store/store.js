
const { configureStore } = require("@reduxjs/toolkit");
import tanggiamReducer from '@/store/tanggiam';
import userReducer from '@/store/login';
import giohangReducer from '@/store/giohang'


const store = configureStore({
    reducer: {
        tanggiam: tanggiamReducer,
        user: userReducer,
        giohang: giohangReducer,
    }
});

export default store;