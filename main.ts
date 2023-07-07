import {oak} from "./src/setup/oak.ts";

await oak.listen({
    hostname: "0.0.0.0",
    port: 80
});