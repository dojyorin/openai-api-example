import {type OakContext, HttpError, HttpStatus} from "../../deps.ts";

export function errorResponse(){
    return async(context:OakContext, next:() => Promise<unknown>)=>{
        try{
            await next();
            context.throw(HttpStatus.NotFound);
        }
        catch(e){
            const {message, status} = new HttpError(e);
            context.response.status = status;
            context.response.body = message;
        }
    };
}