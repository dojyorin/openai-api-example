import {type OakMiddleware, mainPath, HttpStatus} from "../../deps.ts";

export function sendStatic():OakMiddleware{
    return async(context)=>{
        // try{
            await context.send({
                root: `${mainPath()}/src/www/application`,
                index: "index.html"
            });
        // }
        // catch(e){
            // console.log(e)
            // if(e instanceof Deno.errors.NotFound){
            //     context.throw(HttpStatus.NotFound);
            // }
            // else{
            //     context.throw(HttpStatus.BadGateway);
            // }
        // }
    };
}