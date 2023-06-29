import {type FetchInit, fetchExtend} from "../deps.ts";

export class OpenAI{
    static #origin = "https://api.openai.com";
    static #version = "v1";

    #key = "";

    constructor(key:string){
        this.#key = key;
    }

    async #fetch<T extends Record<keyof T, unknown>, U extends Record<keyof U, unknown>>(path:string, body?:U){
        return <T>await fetchExtend(`${OpenAI.#origin}/${OpenAI.#version}/${path}`, "json", {
            method: body ? "POST" : "GET",
            body: body && JSON.stringify(body),
            headers: {
                "Authorization": `Bearer ${this.#key}`,
                "Content-Type": "application/json"
            }
        });
    }

    async chatCompletion(){
        await this.#fetch("/chat/completions", {
            model: "gpt-3.5-turbo",
            messages
        });
    }

    async imageGeneration(){
        await this.#fetch("", {
            response_format: "b64_json",
            prompt,
            n
        });
    }

    async listModel(){
        await this.#fetch("/models");
    }
}