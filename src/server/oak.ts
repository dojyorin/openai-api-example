import {Oak, HttpError, mainPath} from "../../deps.ts";
import {router} from "./routing/routing.ts";

const oak = new Oak();

oak.use(async({response}, next)=>{
    try{
        await next();
    }
    catch(e){
        if(e instanceof HttpError){
            response.status = e.status;
            response.body = e.message;
        }
        else{
            console.error(e);
            response.status = 500;
        }
    }
});

oak.use(router.routes(), router.allowedMethods());

oak.use(async(context, next)=>{
    try{
        await context.send({
            root: `${mainPath()}/src/client`,
            index: "index.html",
            format: false
        });
    }
    catch(e){
        console.error(e);
        await next();
    }
});

export {oak};