import {serve as createServer} from "https://deno.land/std@0.192.0/http/server.ts";
import {type FetchInit, fetchExtend} from "https://deno.land/x/simple_utility@v1.0.0/mod.ts";

interface ChatQuery{
    model: string;
    messages: {
        role: "system" | "user" | "assistant" | "function";
        name?: string;
        content?: string;
    }[];
    temperature?: number;
    top_p?: number;
    n?: number;
    max_tokens?: number;
    presence_penalty?: number;
    frequency_penalty?: number;
    user?: string;
}

interface ImageQuery{
    prompt: string;
    response_format?: "b64_json" | "url";
    size?: "256x256" | "512x512" | "1024x1024";
    n?: number;
    user?: string;
}

interface ChatResult{
    id: string;
    object: string;
    created: number;
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
    choices: {
        index: number;
        message: {
            role: string;
            content: string;
        };
        finish_reason: string;
    }[];
}

interface ImageResult{
    created: number;
    data: {
        url: string;
        b64_json: string;
    }[];
}

interface ModelResult{
    object: string;
    data: {
        id: string;
        object: string;
        owned_by: string;
        permission: {
            id: string;
            object: string;
            created: number;
            allow_create_engine: boolean;
            allow_sampling: boolean;
            allow_logprobs: boolean;
            allow_search_indices: boolean;
            allow_view: boolean;
            allow_fine_tuning: boolean;
            organization: string;
            group: string | null;
            is_blocking: boolean;
        }[];
    }[];
}

async function fetchApi<T extends Record<keyof T, unknown>>(path:string, option?:Pick<FetchInit, "method" | "body">){
    return <T>await fetchExtend(`https://api.openai.com/v1${path}`, "json", {
        ...option,
        headers: {
            "Authorization": `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
            "Content-Type": "application/json"
        }
    });
}

function responseEnd<T extends number | string | Record<keyof T, unknown>>(data:T){
    return new Response((()=>{
        switch(typeof data){
            case "number": return undefined;
            case "string": return data;
            case "object": return JSON.stringify(data);
        }
    })(), {
        status: (()=>{
            switch(typeof data){
                case "number": return data;
                case "string": return 200;
                case "object": return 200;
            }
        })(),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Content-Type": (()=>{
                switch(typeof data){
                    case "number": return "text/plain";
                    case "string": return "text/plain";
                    case "object": return "application/json";
                }
            })()
        }
    });
}

createServer(async(request)=>{
    const isGet = request.method === "GET";
    const isPost = request.method === "POST";

    async function _json<T extends Record<keyof T, unknown>>(){
        return <T>await request.json();
    }

    console.log(request);

    if(request.method === "OPTIONS"){
        return responseEnd(200);
    }

    switch(new URL(request.url).pathname){
        case "/": {
            return responseEnd(isGet ? 200 : 405);
        }

        case "/chat": {
            if(!isPost){
                return responseEnd(405);
            }

            const input = await _json<ChatQuery["messages"]>();

            if(!input.length || input.some(({role, content}) => !role || !content)){
                return responseEnd(400);
            }

            const messages = input.map(({role, content}) => ({role, content}));

            const result = await fetchApi<ChatResult>("/chat/completions", {
                method: "POST",
                body: JSON.stringify(<ChatQuery>{
                    model: "gpt-3.5-turbo",
                    messages
                })
            });

            return responseEnd(result.choices);
        }

        case "/image": {
            if(!isPost){
                return responseEnd(405);
            }

            const {prompt, n} = await _json<Required<ImageQuery>>();

            if(!prompt){
                return responseEnd(400);
            }

            const result = await fetchApi<ImageResult>("/images/generations", {
                method: "POST",
                body: JSON.stringify(<ImageQuery>{
                    response_format: "b64_json",
                    prompt,
                    n
                })
            });

            return responseEnd(result.data);
        }

        case "/model": {
            if(!isGet){
                return responseEnd(405);
            }

            const result = await fetchApi<ModelResult>("/models");

            return responseEnd(result.data);
        }

        default: return responseEnd(404);
    }
});