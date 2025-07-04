'use client'
import Breadcrumb from "@/app/components/Breadcrumb";
import axios from "axios";
import { useEffect, useState } from "react";

export default function NewProduct(){

    const [_title, setTitle] = useState('');
    const [btnThem, setBtnThem] = useState(false);
    const [ketQua, setKetQua] = useState({});

    const suKienThem = function (e) {
        e.preventDefault();
        setBtnThem(true);
        
    }

    //Sẽ chạy lần đâu tiên và chạy khi biến btnThem thay đổi giá trị
    useEffect(() => {
        if(btnThem === true){
            axios.post('https://dummyjson.com/products/add', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: _title,
                    /* other product data */
                })
            })
            .then( (kQ) => {
                setKetQua(kQ.data); 
                setBtnThem(false);
            })
        }
        
    },[btnThem])

    if(ketQua.id > 0){
        alert('Thêm sản phẩm thành công');
    }            

    return (
        <>
            <div>
                <Breadcrumb a={'Sản phẩm'} b={'Thêm sản phẩm'}/>
                <form onSubmit={(e) => {suKienThem(e)}}>
                    <div style={{display:'flex', alignItems: 'center', padding: '40px',flexDirection: 'column'}}>
                        <div> 
                            Tên sản phẩm: <input name="title" type="text" onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div style={{marginTop: '20px'}}><button type="submit">Thêm sản phẩm</button></div>
                    </div>
                </form>
            </div>
        </>
    )
}

