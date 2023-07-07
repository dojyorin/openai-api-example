import {
    type CreateChatCompletionRequest,
    type CreateChatCompletionResponse,
    type CreateImageRequest,
    type ImagesResponse,
    type ListModelsResponse,
    type Model,
    fetchExtend
} from "../deps.ts";

type IPartial<T> = Partial<Record<keyof T, unknown>>;

export class OpenAI{
    #key = "";

    constructor(key:string){
        this.#key = key;
    }

    async #fetch<T extends IPartial<T>, U extends IPartial<U>>(path:string, body?:T){
        return <U>await fetchExtend(`https://api.openai.com/v1/${path}`, "json", {
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

    async createChatCompletion(option:CreateChatCompletionRequest):Promise<CreateChatCompletionResponse>{
        return await this.#fetch("/chat/completions", option);
    }

    async createImage(option:CreateImageRequest):Promise<ImagesResponse>{
        return await this.#fetch("/images/generations", option);
    }

    async listModels():Promise<ListModelsResponse>{
        return await this.#fetch("/models");
    }

    async retrieveModel(model:string):Promise<Model>{
        return await this.#fetch(`/models/${model}`);
    }
}