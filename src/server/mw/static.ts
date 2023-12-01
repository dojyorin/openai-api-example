import {Middleware, mainPath} from "../../deps.ts";
import {type ServerState} from "../oak.ts";

export function sendStatic():OakMiddleware<ServerState>{
    return async(context, next)=>{
        try{
            await context.send({
                root: `${mainPath()}/src/www`,
                index: "index.html",
                format: false
            });
        }
        catch{
            await next();
        }
    };
}