import {createServer} from "../deps.ts";
import {router} from "../src/router.ts";
import {responseCode} from "./src/mids/response.ts";

createServer(async(request)=>{
    console.log(request);

    if(request.method === "OPTIONS"){
        return responseCode(200);
    }

    return await router(request);
});