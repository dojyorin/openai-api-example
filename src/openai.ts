import {OpenAI} from "../deps.ts";

const key = Deno.env.get("OPENAI_API_KEY");

const openai = new OpenAI(key ?? "", "v1");

export {openai};