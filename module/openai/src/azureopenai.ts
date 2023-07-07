import {
    type CreateChatCompletionRequest,
    type CreateChatCompletionResponse,
    fetchExtend
} from "../deps.ts";

type Convert<T> = Partial<Record<keyof T, unknown>>;

interface AzureEndpoint{
    resource: string;
    version: string;
    deployment: {
        chat?: string;
    };
    ad?: boolean;
}

export class AzureOpenAI{
    #key:string;
    #azure:AzureEndpoint;

    constructor(key:string, azure:AzureEndpoint){
        this.#key = key;
        this.#azure = azure;
    }

    async #fetch<T extends Convert<T>, U extends Convert<U>>(path:string, body?:T){
        return <U>await fetchExtend(`https://${this.#azure.resource}.openai.azure.com/openai/deployments/${path}`, "json", {
            method: body ? "POST" : "GET",
            body: body && JSON.stringify(body),
            query: {
                "api-version": this.#azure.version
            },
            headers: {
                ...this.#azure.ad ? {
                    "Authorization": `Bearer ${this.#key}`
                } : {
                    "api-key": this.#key
                },
                ...body && {
                    "Content-Type": "application/json"
                }
            }
        });
    }

    async createChatCompletion(option:CreateChatCompletionRequest):Promise<CreateChatCompletionResponse>{
        if(!this.#azure.deployment.chat){
            throw new ReferenceError();
        }

        return await this.#fetch(`/${this.#azure.deployment.chat}/chat/completions`, option);
    }
}