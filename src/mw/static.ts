import {type OakMiddleware, mainPath} from "../../deps.ts";

export function sendStatic():OakMiddleware{
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