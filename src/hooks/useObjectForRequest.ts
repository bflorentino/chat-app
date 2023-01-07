import { RequestObject, Endpoint, RequestsType } from "../types/types";

// Returns an object to make a HTTP Request
const useObjectForReqest = (endp: Endpoint, method:RequestsType, headers_body:boolean ):RequestObject => {

    return {
        method,
        endpoint:endp,
        body: headers_body ? {} : undefined,
        headers: headers_body ? {'Content-Type' : 'application/json' } : undefined
    }
}

export default useObjectForReqest