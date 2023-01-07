import { RequestObject } from "../types/types";
import { ServerResponse } from "../types/types";
import { BASE_URL } from "../constants";

export const useFetchData = () => async (requestObj:RequestObject): Promise<ServerResponse> => {

    const { endpoint, isFormData, ...request} = requestObj  

    const res = await fetch(`${BASE_URL}${endpoint}` as unknown as URL, 
                             request as RequestInit)
    
    return await res.json()
}