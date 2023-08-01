import {OakMiddleware} from "../../deps.ts";
import {sessions} from "../store.ts";

export function setSessionId():OakMiddleware{
    const key = "sid";

    return async({cookies, state}, next)=>{
        const sid = await cookies.get(key);

        if(sid){
            sessions.get(sid);

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
                update: new Date(),
                history: []
            });

            state.sid = uuid;
        }

        await next();
    };
}