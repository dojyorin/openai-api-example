import {HttpError} from "../../deps.ts";
import {type MW} from "./utility.ts";

export function catchError():MW{
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