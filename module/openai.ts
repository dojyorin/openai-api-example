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

    async nativeChatCompletions(option){
        await this.#fetch("/chat/completions", option);
    }

    async nativeImageGenerations(option){
        await this.#fetch("/image/generations", option);
    }

    async nativeModels(){
        await this.#fetch("/models");
    }
}