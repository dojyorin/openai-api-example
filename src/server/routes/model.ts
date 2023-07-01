import {isGet} from "../request.ts";
import {responseCode, responseJson} from "../response.ts";
import {openai} from "../global.ts";

export async function route(request:Request){
    if(!isGet(request)){
        return responseCode(405);
    }

    const result = await openai.simpleModel();

    return responseJson(result);
}