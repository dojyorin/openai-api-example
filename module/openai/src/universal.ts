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
}

export class OpenAI{
    #key:string;
    #azure?:AzureEndpoint;

    constructor(key:string, azure?:AzureEndpoint){
        this.#key = key;
        this.#azure = azure;
    }

    async #fetch<T extends Opt<T>, U extends Opt<U>>(path:string, body?:T){
        let ep = "";

        const request = {
            method: body ? "POST" : "GET",
            body: body && JSON.stringify(body),
            query: new URLSearchParams(),
            headers: new Headers(body && {
                "Content-Type": "application/json"
            })
        };

        if(this.#azure){
            ep = `https://${this.#azure.resource}.openai.azure.com/openai/${path}`;
            request.query.set("api-version", this.#azure.version);
            request.headers.set("api-key", this.#key);
        }
        else{
            ep = `https://api.openai.com/v1/${path}`;
            request.headers.set("Authorization", `Bearer ${this.#key}`);
        }

        return <U>await fetchExtend(ep, "json", {
            ...request
        });
    }

    get useAzure():boolean{
        return !!this.#azure;
    }

    async createChatCompletion(option:CreateChatCompletionRequest):Promise<CreateChatCompletionResponse>{
        return await this.#fetch(this.#azure ? `/deployments/${option.model}/chat/completions` : "/chat/completions", option);
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