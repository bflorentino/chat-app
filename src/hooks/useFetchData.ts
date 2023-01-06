import { RequestObject } from "../types/types";
import { ServerResponse } from "../types/types";
import { BASE_URL } from "../constants";

export const useFetchData = () => async (requestObj:RequestObject): Promise<ServerResponse> => {

    const request = {
        method:requestObj.type,
        headers: requestObj.headers,
        body : requestObj.body
    }

    const res = await fetch(`${BASE_URL}${requestObj.endpoint}` as unknown as URL, 
                             request as unknown as RequestInit)
    
    return await res.json()
}