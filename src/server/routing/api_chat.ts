import {OpenAI, Router, createHttpError} from "../../../deps.ts";
import {oai} from "../../backend/openai.ts";
import {bodyJson} from "../extension/mod.ts";

interface ChatRequest{
    query: string;
    history: string;
    background: string;
}

const router = new Router();

router.post("/", async({request, response})=>{
    const input = await bodyJson<ChatRequest>(request);

    if(!input.query){
        throw createHttpError(415);
    }

    const params:OpenAI.ChatCompletionMessageParam[] = [{
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

    const {choices} = await oai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: params
    });

    response.body = {
        value: choices[0].message?.content
    };
});

export {router};