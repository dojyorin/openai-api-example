import {createHttpError} from "../../../deps.ts";

export function verifyKey(h:Headers){
    const key = h.get("authorization")?.replace(/^Bearer /, "") ?? "";

    if(!/^[0-9a-f]+$/.test(key)){
        throw createHttpError(401, "無効なAPIキーです");
    }

    return key;
}