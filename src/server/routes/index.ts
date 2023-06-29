import {responseCode, responseHtml} from "../mids/response.ts";

const html = await Deno.readTextFile("./src/client/index.html");

export function route(request:Request){
    if(request.method !== "GET"){
        return responseCode(405);
    }

    return responseHtml(html);
}