import {OpenAI} from "../deps.ts";

const key = Deno.env.get("OPENAI_API_KEY");

if(!key){
    throw new ReferenceError("Environment variable 'OPENAI_API_KEY' not found.");
}

const openai = new OpenAI(key, "v1");

export {openai};