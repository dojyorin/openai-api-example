import {OakRouter} from "../../deps.ts";

const html = await Deno.readTextFile("./src/client/index.html");

const router = new OakRouter();

router.get("/", ({response})=>{
    response.type = "text/html";
    response.body = html;
});

export {router};