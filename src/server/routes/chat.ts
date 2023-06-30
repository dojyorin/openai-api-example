import {isPost} from "../mids/method.ts";
import {requestJson} from "../mids/request.ts";
import {responseCode, responseText} from "../mids/response.ts";
import {openai} from "../global/openai.ts";

interface FormInput{
    query: string;
    history: string;
    background: string;
}

export async function route(request:Request){
    if(!isPost(request)){
        return responseCode(405);
    }

    const input = await requestJson<FormInput>(request);

    if(!input?.query){
        return responseCode(400);
    }

    const result = await openai.simpleChatCompletion(input.query, input.history, input.background);

    return responseText(result);
}