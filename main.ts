/// <reference lib="deno.ns"/>
/// <reference lib="deno.unstable"/>

import {oak} from "./src/oak.ts";

await oak.listen({
    hostname: "0.0.0.0",
    port: 3456
});