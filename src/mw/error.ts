import {type OakMiddleware, HttpError} from "../../deps.ts";

export function catchError():OakMiddleware{
    return async(context, next)=>{
        try{
            await next();
        }
        catch(e){
            const {message, status} = new HttpError(e);
            context.response.status = status;
            context.response.body = message;
        }
    };
}