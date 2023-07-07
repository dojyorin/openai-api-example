import {type ChatCompletionRequestMessage, OakRouter} from "../../../deps.ts";
import {openai} from "../../setup/openai.ts";
import {bodyJson} from "../../sugar/request.ts";

interface ChatRequest{
    query: string;
    history: string;
    background: string;
}

const router = new OakRouter();

router.post("/", async({request, response})=>{
    const input = await bodyJson<ChatRequest>(request);

    if(!input.query){
        response.status = 415;
        return;
    }

    const params:ChatCompletionRequestMessage[] = [{
        role: "user",
        content: input.query
    }];

    if(input.history){
        params.push({
            role: "assistant",
            content: input.history
        });
    }

    if(input.background){
        params.push({
            role: "system",
            content: input.background
        });
    }

    const {choices} = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: params
    });

    response.body = {
        value: choices[0].message?.content
    };
});

export {router};