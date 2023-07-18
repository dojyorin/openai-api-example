import {type OakRequest, type Opt} from "../../deps.ts";

export async function bodyJson<T extends Opt<T>>(request:OakRequest){
    const json = <T>await request.body({
        type: "json"
    }).value;

    if(typeof json !== "object" || json === null){
        throw new TypeError();
    }

    return json;
}