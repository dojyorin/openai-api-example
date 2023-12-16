import {type Middleware, HttpError} from "../../../deps.ts";

export function catchError():Middleware{
    return async({response}, next)=>{
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
    };
}