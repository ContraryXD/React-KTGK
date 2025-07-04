'use client'
import Breadcrumb from "@/app/components/Breadcrumb";
import axios from "axios";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function Sua() {

    const {id} = useParams();
    const [sua, setSua] = useState(false);
    const [_title, setTitle] = useState({});
    const [isLoading, setIsLoading] =  useState(false);
    const [dataEdit, setDataEdit] = useState(null);

    const suKienSua = function (e) {
        e.preventDefault();
        setSua(true);   
    }
    
    useEffect(() => {
        if(sua === false){
            //Tải dữ liệu cần sửa
            axios.get(`https://dummyjson.com/products/${id}`)
            .then(kQ => {setTitle(kQ.data.title); setIsLoading(true);});
        }
        else if(sua === true){
            axios.put(`https://dummyjson.com/products/${id}`,{
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: _title
                })
            })
            .then(kQ => {setDataEdit(kQ.data)})
        }
        
    },[sua])

    if( dataEdit != null && dataEdit.id > 0){
        alert('Sửa sản phẩm thành công');
    }
    else if(dataEdit != null) {
        alert('Lỗi sửa sản phẩm');
    }

    if(isLoading)
    return (
            <>
                <div>
                    <Breadcrumb a={'Sản phẩm'} b={'Sửa sản phẩm'}/>
                    <form onSubmit={(e) => {suKienSua(e)}}>
                        <div style={{display:'flex', alignItems: 'center', padding: '40px',flexDirection: 'column'}}>
                            <div> 
                                Tên sản phẩm: <input name="title" value={_title||''} type="text" onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div style={{marginTop: '20px'}}><button type="submit">Sửa sản phẩm</button></div>
                        </div>
                    </form>
                </div>
            </>
    )
}


