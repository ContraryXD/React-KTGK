'use client'
import axios from "axios";
import { useParams,useRouter } from "next/navigation"
import { useEffect } from "react";

export default function Xoa(){
    const {id} = useParams();
    const router = useRouter();

    useEffect(() => {
        axios.delete(`https://dummyjson.com/products/${id}`)
        .then((kQ) => {if(kQ.data.isDeleted === true) router.push('/')})
        .catch((e) => console.error(e));
    },[])

    return (
        <></>
    )
}