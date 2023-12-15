import {type Middleware, mainPath} from "../../../deps.ts";

export function sendStatic():Middleware{
    return async(context, next)=>{
        try{
            await context.send({
                root: `${mainPath()}/src/client`,
                index: "index.html",
                format: false
            });
        }
        catch{
            await next();
        }
    };
}