import {type OakRequest, type Opt} from "../../../deps.ts";

export async function bodyJson<T extends Opt<T>>(request:OakRequest){
    const body = await request.body({
        type: "json"
    }).value;

    if(typeof body !== "object" || body === null){
        throw new TypeError();
    }

    return <T>body;
}