import {fetchExtend} from "../../deps.ts";
import {openai} from "../openai.ts";
import {bodyJson} from "../extension/request.ts";
import {createRouter} from "./utility.ts";

interface ImageRequest{
    query: string;
    size: 256 | 512 | 1024;
}

const pixels = <const>{
    256: "256x256",
    512: "512x512",
    1024: "1024x1024"
};

const router = createRouter();

router.post("/", async({request, response})=>{
    const input = await bodyJson<ImageRequest>(request);

    if(!input.query){
        response.status = 415;
        return;
    }

    const {data} = await openai.createImage({
        prompt: input.query,
        size: input.size && pixels[input.size],
        n: 1
    });

    const resource = data[0]?.url;

    if(!resource){
        response.status = 415;
        return;
    }

    const {href, searchParams} = new URL(resource);

    response.body = {
        value: await fetchExtend(href, "base64", {
            query: searchParams
        })
    };
});

export {router};