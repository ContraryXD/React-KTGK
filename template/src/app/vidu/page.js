'use client'
import { giam, tang } from "@/store/tanggiam";
import { useDispatch, useSelector } from "react-redux"

export default function SuDungRedux(){
    //Lấy kết quả trong slice
    const kQ = useSelector((state) => state.tanggiam.value);
    //Gọi hành động trong slice
    const dispath = useDispatch();
    return (
        <>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
            <div>
                <h1>Kết quả: {kQ}</h1>
                <div>
                    <button onClick={() => {dispath(giam())}}>Giảm</button>
                    <button onClick={() => {dispath(tang())}}>Tăng</button>
                </div>
            </div>
        </>
    )
}