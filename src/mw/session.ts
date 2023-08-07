import {kv, t_session} from "../kv.ts";
import {type MW} from "./utility.ts";

export function setSessionId():MW{
    const key = "sid";

    return async({cookies, state}, next)=>{
        const sid = await cookies.get(key);

        if(sid){
            state.sid = sid;
        }
        else{
            const uuid = crypto.randomUUID();

            await cookies.set(key, uuid, {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });

            await kv.set([t_session, uuid], "");

            state.sid = uuid;
        }

        await next();
    };
}