import {oak} from "./src/server/oak.ts";

await Deno.serve(async request => await oak.handle(request) ?? new Response()).finished;