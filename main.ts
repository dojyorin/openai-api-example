import {createServer} from "./deps.ts";
import {router} from "./src/server/router.ts";
import {responseCode} from "./src/server/mids/response.ts";

createServer(async(request)=>{
    console.log(request);

    if(request.method === "OPTIONS"){
        return responseCode(200);
    }

    return await router(request);
});