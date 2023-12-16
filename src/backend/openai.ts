import {OpenAI, envGet} from "../../deps.ts";
console.log(envGet("OPENAI_KEY", "string", true))
const oai = new OpenAI({
    fetch: fetch,
    apiKey: envGet("OPENAI_KEY", "string", true)
});

export {oai};