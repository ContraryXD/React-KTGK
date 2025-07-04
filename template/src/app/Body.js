"use client"
import { useEffect, useState } from "react";
import Index from "./Index";
import PreLoader from "./components/PreLoader";

export default function Body () {
    //return <Index/>
    const [isLoading, setIsLoading] = useState(true)
    
      useEffect(() => {
        if(document.readyState === 'complete'){
          setIsLoading(false);
        }
      },[]);
      
      if(isLoading){
        return(
          <PreLoader/>
        )
      }
      else{
        return (
          <>
            <Index/>
          </>
        );
      }
    
}