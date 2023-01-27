import React,{ useEffect } from "react";

const useClickOutside = (ref:React.RefObject<HTMLElement>, callback:(event:MouseEvent | TouchEvent)=> void) => {

    useEffect(() => {

        const handler = (event:MouseEvent | TouchEvent) => {
            if(ref.current && !ref.current.contains(event.target as Node)){
                callback(event)
            }
        }

        document.addEventListener("click", handler)
        document.addEventListener("touchstart", handler)
        
        return()=>{
            document.removeEventListener("click", handler)
            document.removeEventListener("touchstart", handler)
        }
    },[ref, callback])
}

export default useClickOutside