import {
    type CreateChatCompletionRequest,
    type CreateChatCompletionResponse,
    fetchExtend
} from "../deps.ts";

type IPartial<T> = Partial<Record<keyof T, unknown>>;

interface AzureDeployment{
    chat: string;
}

export class AzureOpenAI{
    #key = "";
    #resource = "";
    #version = "";
    #deployment:Partial<AzureDeployment>;

    constructor(key:string, resource:string, version:string, deployment:Partial<AzureDeployment>){
        this.#key = key;
        this.#resource = resource;
        this.#version = version;
        this.#deployment = deployment;
    }

    async #fetch<T extends IPartial<T>, U extends IPartial<U>>(path:string, body?:T){
        return <U>await fetchExtend(`https://${this.#resource}.openai.azure.com/openai/deployments/${path}`, "json", {
            method: body ? "POST" : "GET",
            body: body && JSON.stringify(body),
            query: {
                "api-version": this.#version
            },
            headers: {
                "api-key": this.#key,
                ...body && {
                    "Content-Type": "application/json"
                }
            }
        });
    }

    async createChatCompletion(option:CreateChatCompletionRequest):Promise<CreateChatCompletionResponse>{
        if(!this.#deployment.chat){
            throw new Error();
        }

        return await this.#fetch(`/${this.#deployment.chat}/chat/completions`, option);
    }
}