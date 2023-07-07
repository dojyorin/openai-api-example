import {OpenAI} from "../../deps.ts";

const key = Deno.env.get("OPENAI_API_KEY");

if(!key){
    throw new Error();
}

const openai = new OpenAI(key);

export {openai};