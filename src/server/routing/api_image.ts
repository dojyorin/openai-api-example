import {Router, createHttpError, fetchExtend} from "../../../deps.ts";
import {oai} from "../../backend/openai.ts";
import {bodyJson} from "../extension/mod.ts";

interface ImageRequest{
    query: string;
    size: 256 | 512 | 1024;
}

const pixels = <const>{
    256: "256x256",
    512: "512x512",
    1024: "1024x1024"
};

const router = new Router();

router.post("/", async({request, response})=>{
    const input = await bodyJson<ImageRequest>(request);

    if(!input.query){
        throw createHttpError(415);
    }

    const {data} = await oai.images.generate({
        prompt: input.query,
        size: input.size && pixels[input.size],
        n: 1
    });

    const resource = data[0]?.url;

    if(!resource){
        throw createHttpError(415);
    }

    const {href} = new URL(resource);

    response.body = {
        value: await fetchExtend(href, "base64")
    };
});

export {router};