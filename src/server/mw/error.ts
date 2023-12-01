import {HttpError} from "../../deps.ts";
import {type ServerState} from "../oak.ts";

export function catchError():OakMiddleware<ServerState>{
    return async({response}, next)=>{
        try{
            await next();
        }
        catch(e){
            if(e instanceof HttpError){
                const {message, status} = new HttpError(e);
                response.status = status;
                response.body = message;
            }
            else{
                console.error(e);
                response.status = 500;
            }
        }
    };
}