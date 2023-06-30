import type {
    ChatCompletionMessage,
    ChatCompletionRequest,
    ChatCompletionResponse,
    ImageGenerationRequest,
    ImageGenerationResponse,
    ModelResponse,
    ModelListResponse
} from "./api.d.ts";

import {fetchExtend, base64Decode} from "./deps.ts";

type IRecord<T> = Record<keyof T, unknown>;

export class OpenAI{
    static #origin = "https://api.openai.com";
    static #version = "v1";

    #key = "";

    constructor(key:string){
        this.#key = key;
    }

    async #fetch<T extends Partial<IRecord<T>>, U extends IRecord<U>>(path:string, body?:T){
        return <U>await fetchExtend(`${OpenAI.#origin}/${OpenAI.#version}/${path}`, "json", {
            method: body ? "POST" : "GET",
            body: body && JSON.stringify(body),
            headers: {
                "Authorization": `Bearer ${this.#key}`,
                ...body && {
                    "Content-Type": "application/json"
                }
            }
        });
    }

    async nativeChatCompletion(option:ChatCompletionRequest):Promise<ChatCompletionResponse>{
        return await this.#fetch("/chat/completions", option);
    }

    async nativeImageGeneration(option:ImageGenerationRequest):Promise<ImageGenerationResponse>{
        return await this.#fetch("/image/generations", option);
    }

    async nativeModel():Promise<ModelListResponse>;
    async nativeModel(model:string):Promise<ModelResponse>;
    async nativeModel(model?:string):Promise<ModelListResponse | ModelResponse>{
        return await this.#fetch(model ? `/models/${model}` : "/models");
    }

    async simpleChatCompletion(message:ChatCompletionMessage):Promise<ChatCompletionMessage>{
        const result = await this.nativeChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [message],
            n: 1
        });

        return result.choices[0].message;
    }

    async simpleImageGeneration(query:string, size?:ImageGenerationRequest["size"]):Promise<Uint8Array>{
        const result = await this.nativeImageGeneration({
            prompt: query,
            size: size ?? "512x512",
            response_format: "b64_json",
            n: 1
        });

        return base64Decode(result.data[0].b64_json);
    }
}