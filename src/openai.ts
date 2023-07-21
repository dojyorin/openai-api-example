import {OpenAI} from "../deps.ts";

// const key = Deno.env.get("OPENAI_API_KEY");
const key = "debug";

if(!key){
    throw new ReferenceError("Environment variable 'OPENAI_API_KEY' not found.");
}

const openai = new OpenAI(key);

export {openai};