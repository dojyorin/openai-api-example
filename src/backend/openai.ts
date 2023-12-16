import {OpenAI, envGet} from "../../deps.ts";

const oai = new OpenAI({
    fetch: fetch,
    apiKey: envGet("OPENAI__KEY", "string", true)
});

export {oai};