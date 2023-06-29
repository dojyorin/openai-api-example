import {isPost} from "../mids/method.ts";
import {requestJson} from "../mids/request.ts";
import {responseCode, responseJson} from "../mids/response.ts";
import {openai} from "../instances/openai.ts";

export async function route(request:Request){
    if(!isPost(request)){
        return responseCode(405);
    }

    const input = await requestJson<ChatQuery["messages"]>(request);

    if(!input?.length || input.some(({role, content}) => !role || !content)){
        return responseCode(400);
    }

    const messages = input.map(({role, content}) => ({role, content}));

    const result = await openai.chatCompletion({});

    return responseJson(result.choices);
}