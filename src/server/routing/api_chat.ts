import {openai} from "../openai.ts";
import {bodyJson} from "../extension/request.ts";
import {createRouter} from "./utility.ts";

interface ChatRequest{
    query: string;
    history: string;
    background: string;
}

const router = createRouter();

router.post("/", async({request, response})=>{
    const input = await bodyJson<ChatRequest>(request);

    if(!input.query){
        response.status = 415;
        return;
    }

    const params:Parameters<typeof openai.createChatCompletion>[0]["messages"] = [{
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