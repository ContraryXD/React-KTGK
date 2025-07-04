'use client'
import Breadcrumb from "@/app/components/Breadcrumb";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DanhSach(){

    const [data, setData] = useState({products: [], isLoading: false})
    const [tk, setTK] = useState('');//Dữ liệu tìm kiếm
    const [btnTK, setBtnTK]= useState(false);//Nhấn nút tìm kiếm

    const timSP = function (e){
        e.preventDefault();
        setBtnTK(true);
    }

    useEffect(() => {
        let link = 'https://dummyjson.com/products'
        if(btnTK === true && tk.length > 0){
            link = `https://dummyjson.com/products/search?q=${tk}`;
        }
        axios.get(link)
        .then((kQ) => {
            setData({products: kQ.data.products, isLoading: true}); 
            //setBtnTK(false);
        });
        
    },[btnTK]);



    if(data.isLoading)
    return (
        <>
            <Breadcrumb a={'Sản phẩm'} b={'Danh sách sản phẩm'}/>
            
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', padding: '40px',}}>
                <div style={{marginBottom: '20px'}}>
                    <form onSubmit={(e) => timSP(e)}>
                        <div>
                            <input type="text" onChange={(e) => {setTK(e.target.value); if(e.target.value.length === 0) setBtnTK(false);}} name="tk" style={{width: '1295px'}}/> 
                            <button type="submit" className="ml-1">Tìm kiếm</button> 
                             <Link href={'/admin/san-pham/them-san-pham'}  className="btn btn-primary ml-2">Thêm</Link>
                        </div>
                    </form>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên</th>
                            <th>Danh mục</th>
                            <th>Tồn kho</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.products.map((v) => 
                            <tr key={v.id}>
                                <td><img src={v.thumbnail} style={{height:'50px'}}/></td>
                                <td>{v.title}</td>
                                <td>{v.category}</td>
                                <td>{v.stock}</td>
                                <td>
                                    <Link href={`/admin/san-pham/sua/${v.id}`} className="btn btn-info" >Sửa</Link> | 
                                    <Link href={`/admin/san-pham/xoa/${v.id}`} className="btn btn-danger">Xóa</Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}