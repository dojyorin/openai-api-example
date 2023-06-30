import {OpenAI} from "../../../module/mod.ts";

const key = Deno.env.get("OPENAI_API_KEY");

if(!key){
    throw new Error();
}

export const openai = new OpenAI(key);