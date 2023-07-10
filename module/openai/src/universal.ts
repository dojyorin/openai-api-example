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
        return <U>await fetchExtend(this.#azure ? `https://${this.#azure.resource}.openai.azure.com/openai/deployments/${path}` : `https://api.openai.com/v1/${path}`, "json", {
            method: body ? "POST" : "GET",
            body: body && JSON.stringify(body),
            headers: {
                ...(this.#azure && !this.#azure.aad) ? {
                    "api-key": this.#key
                } : {
                    "Authorization": `Bearer ${this.#key}`
                },
                ...body && {
                    "Content-Type": "application/json"
                }
            },
            query: this.#azure && {
                "api-version": this.#azure.version
            }
        });
    }

    #azureUnsupported(){
        if(this.#azure){
            throw new ReferenceError();
        }
    }

    #azureDeployment(deployment:keyof AzureEndpoint["deployment"]){
        if(this.#azure && !this.#azure.deployment[deployment]){
            throw new ReferenceError();
        }
    }

    async createChatCompletion(option:CreateChatCompletionRequest):Promise<CreateChatCompletionResponse>{
        this.#azureDeployment("chat");

        return await this.#fetch(this.#azure ? `/${this.#azure.deployment.chat}/chat/completions` : "/chat/completions", option);
    }

    async createImage(option:CreateImageRequest):Promise<ImagesResponse>{
        this.#azureUnsupported();

        return await this.#fetch("/images/generations", option);
    }

    async listModels():Promise<ListModelsResponse>{
        this.#azureUnsupported();

        return await this.#fetch("/models");
    }

    async retrieveModel(model:string):Promise<Model>{
        this.#azureUnsupported();

        return await this.#fetch(`/models/${model}`);
    }
}