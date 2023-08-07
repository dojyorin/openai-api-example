import {session} from "../store/mod.ts";
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

            sessions.set(uuid, {
                history: []
            });

            state.sid = uuid;
        }

        await next();
    };
}