import {type OakMiddleware, HttpError, HttpStatus} from "../../deps.ts";

export function errorResponse():OakMiddleware{
    return async(context, next)=>{
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