import {type OakRequest} from "../../deps.ts";

export async function bodyJson<T extends Record<keyof T, unknown>>(request:OakRequest){
    const json = <Partial<T>>await request.body({
        type: "json"
    }).value;

    if(typeof json !== "object" || json === null){
        throw new TypeError();
    }

    return json;
}