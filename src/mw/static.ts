import {type OakMiddleware, mainPath} from "../../deps.ts";

export function staticApplication():OakMiddleware{
    return async(context)=>{
        await context.send({
            root: `${mainPath()}/src/www/application`,
            index: "index.html",
            path: "/application"
        });
    };
}