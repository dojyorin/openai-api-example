import {Oak} from "../deps.ts";
import {default as router} from "./routing/routing.ts";
import {catchError, sendStatic} from "./mw/mod.ts";

export interface ServerState{
    sid: string;
}

const oak = new Oak<ServerState>({
    state: {
        sid: ""
    }
});

oak.use(catchError());
oak.use(sendStatic());
oak.use(router.routes(), router.allowedMethods());

export default oak;