import {oak} from "./src/oak.ts";

Deno.serve({

}, request => request);
await oak.listen({
    hostname: "0.0.0.0",
    port: 3456
});