import type {} from "./api.d.ts";
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
                ...body && {
                    "Content-Type": "application/json"
                }
            }
        });
    }

    async nativeChatCompletions(option){
        return await this.#fetch("/chat/completions", option);
    }

    async nativeImageGenerations(option){
        return await this.#fetch("/image/generations", option);
    }

    async nativeModels(){
        return await this.#fetch("/models");
    }

    async chatMessages(){
        const result = await this.nativeChatCompletions({});
    }
}