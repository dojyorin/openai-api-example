import {IMDS} from "./utility.ts";

interface SessionStore{
    history: unknown[];
}

export const sessions = new IMDS<SessionStore>();

sessions.watchStart(3600);