import {isPost, requestJson} from "../request.ts";
import {responseCode, responseJson} from "../response.ts";
import {openai} from "../global.ts";

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

    return responseJson({
        value: result
    });
}