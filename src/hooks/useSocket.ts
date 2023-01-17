import { SocketOptions } from "dgram";
import { useEffect, useRef } from "react";
import { io, ManagerOptions, Socket } from "socket.io-client";

export const useSocket = (url:string, options?: Partial<ManagerOptions & SocketOptions> | undefined ):Socket => {
   
    const socket = useRef(io(url, options))

    useEffect(()=> {
        return()=>{
            socket.current && socket.current.close()
        }
    },[socket.current])

    return socket.current
}
