import {mainPath} from "../../deps.ts";
import {type MW} from "./utility.ts";

export function sendStatic():MW{
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