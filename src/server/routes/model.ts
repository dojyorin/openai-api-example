import {responseCode, responseJson} from "../mids/response.ts";

export async function route(request:Request){
    if(request.method !== "GET"){
        return responseCode(405);
    }

    const result = await fetchApi<ModelResult>("/models");

    return responseJson(result.data);
}