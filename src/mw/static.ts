import {type OakMiddleware, fromFileUrl} from "../../deps.ts";

export function errorResponse():OakMiddleware{
    return async(context)=>{
        await context.send({
            root: fromFileUrl(import.meta.resolve("../client")),
            index: "index.html"
        });
    };
}