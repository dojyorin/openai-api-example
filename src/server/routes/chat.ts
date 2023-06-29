import {isPost} from "../mids/method.ts";
import {requestJson} from "../mids/request.ts";
import {responseCode, responseJson} from "../mids/response.ts";

export async function route(request:Request){
    if(!isPost(request)){
        return responseCode(405);
    }

    const input = await requestJson<ChatQuery["messages"]>(request);

    if(!input?.length || input.some(({role, content}) => !role || !content)){
        return responseCode(400);
    }

    const messages = input.map(({role, content}) => ({role, content}));

    const result = await fetchApi<ChatResult>("/chat/completions", {
        method: "POST",
        body: JSON.stringify(<ChatQuery>{
            model: "gpt-3.5-turbo",
            messages
        })
    });

    return responseJson(result.choices);
}