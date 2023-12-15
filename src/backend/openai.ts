import {OpenAI, envGet} from "../../deps.ts";

const oai = new OpenAI({
    apiKey: envGet("OPENAI_KEY", "string", true)
});

export {oai};