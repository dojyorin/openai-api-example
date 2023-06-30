import {OpenAI} from "../../../module/openai.ts";

export const openai = new OpenAI(Deno.env.get("OPENAI_API_KEY"));