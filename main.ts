import {createServer} from "../deps.ts";
import {router} from "../src/router.ts";

createServer(async(request)=>{
    console.log(request);

    if(request.method === "OPTIONS"){
        return new Response();
    }

    return await router(request);
});