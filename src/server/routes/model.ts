import {isGet} from "../mids/method.ts";
import {responseCode, responseJson} from "../mids/response.ts";
import {openai} from "../global/openai.ts";

export async function route(request:Request){
    if(!isGet(request)){
        return responseCode(405);
    }

    const result = await openai.simpleModel();

    return responseJson(result);
}