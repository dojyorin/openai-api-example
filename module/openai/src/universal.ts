import {
    type CreateChatCompletionRequest,
    type CreateChatCompletionResponse,
    type CreateImageRequest,
    type ImagesResponse,
    type ListModelsResponse,
    type Model,
    fetchExtend
} from "../deps.ts";

type Opt<T> = Partial<Record<keyof T, unknown>>;

interface AzureEndpoint{
    resource: string;
    version: string;
    aad: boolean;
    deployment: {
        chat?: string;
    };
}

export class OpenAI{
    #key:string;
    #azure?:AzureEndpoint;

    constructor(key:string, azure?:AzureEndpoint){
        this.#key = key;
        this.#azure = azure;
    }

    async #fetch<T extends Opt<T>, U extends Opt<U>>(path:string, body?:T){
        if(this.#azure){
            throw new ReferenceError();
        }

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

    async #fetchAz<T extends Opt<T>, U extends Opt<U>>(deployment:keyof AzureEndpoint["deployment"], path:string, body?:T){
        if(!this.#azure || !this.#azure.deployment[deployment]){
            throw new ReferenceError();
        }

        return <U>await fetchExtend(`https://${this.#azure.resource}.openai.azure.com/openai/deployments/${this.#azure.deployment[deployment]}/${path}`, "json", {
            method: body ? "POST" : "GET",
            body: body && JSON.stringify(body),
            headers: {
                ...this.#azure.aad ? {
                    "Authorization": `Bearer ${this.#key}`
                } : {
                    "api-key": this.#key
                },
                ...body && {
                    "Content-Type": "application/json"
                }
            },
            query: {
                "api-version": this.#azure.version
            }
        });
    }

    async createChatCompletion(option:CreateChatCompletionRequest):Promise<CreateChatCompletionResponse>{
        return this.#azure ? await this.#fetchAz("chat", "/chat/completions", option) : await this.#fetch("/chat/completions", option);
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