'use client'
import '@/app/login.css';
import { dangnhap } from '@/store/login';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Login() {

    const [user, setUser] = useState({});
    const [btnLogin, setBtnLogin] = useState(false);
    const dispath = useDispatch();
    const route = useRouter();
    const status = useSelector((state) => state.user.status)

    const layGiaTri = function (e) {
        let n = e.target.name;
        let v = e.target.value;
        setUser((o) => ({ ...o, [n]: v }))
    }

    const dangNhap = function (e) {
        e.preventDefault();
        setBtnLogin(true);
    }

    useEffect(() => {
        if(status === true){
            route.push('/');
        }
        if (btnLogin === true) {
            axios.post('https://dummyjson.com/user/login', {
                username: user.username,
                password: user.password,
                expiresInMins: 30, // optional, defaults to 60
            })
                .then((kQ) => {
                    dispath(dangnhap(kQ.data));//Lưu dữ liệu vào redux-tookit
                    localStorage.setItem('user', kQ.data);//Lưu dữ liệu vào trong máy cá nhân
                    setBtnLogin(false);
                    route.push('/');
                })
                .catch((e) => console.error(e))
        }
    }, [btnLogin])

    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={(e) => dangNhap(e)}>
                    <input type="text" placeholder="username" name='username' onChange={(e) => layGiaTri(e)} />
                    <input type="password" placeholder="password" name='password' onChange={(e) => layGiaTri(e)} />
                    <button type='submit'>Đăng nhập</button>
                    <p className="message">
                        Bạn chưa có tài khoản? <a href="#">Tạo tài khoản</a>
                    </p>
                </form>
            </div>
        </div>
    )
}


