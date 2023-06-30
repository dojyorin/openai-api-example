import {isGet} from "../mids/method.ts";
import {responseCode, responseHtml} from "../mids/response.ts";

const html = await Deno.readTextFile("./src/client/index.html");

export function route(request:Request){
    if(!isGet(request)){
        return responseCode(405);
    }

    return responseHtml(html);
}