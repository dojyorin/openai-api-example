import {oak} from "./src/oak.ts";

await Deno.serve({
    hostname: "0.0.0.0",
    port: 8765
}, async(request)=>{
    return await oak.handle(request) ?? new Response();
}).finished;