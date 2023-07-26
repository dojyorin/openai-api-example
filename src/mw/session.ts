import {OakMiddleware} from "../../deps.ts";
import {sessions} from "../store.ts";

export function setSessionId():OakMiddleware{
    const key = "sid";

    return async({cookies}, next)=>{
        if(!await cookies.get(key)){
            const uuid = crypto.randomUUID();

            await cookies.set(key, uuid, {
                expires: new Date(),
                httpOnly: true,
                sameSite: "strict",
                overwrite: false
            });

            sessions.set(uuid);
        };

        await next();
    };
}