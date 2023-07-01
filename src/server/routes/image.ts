import {isPost, requestJson} from "../request.ts";
import {responseCode, responseJson} from "../response.ts";
import {openai} from "../global.ts";

interface FormInput{
    query: string;
    size: 256 | 512 | 1024;
}

const pixels = <const>{
    256: "256x256",
    512: "512x512",
    1024: "1024x1024"
};

export async function route(request:Request){
    if(!isPost(request)){
        return responseCode(405);
    }

    const input = await requestJson<FormInput>(request);

    if(!input?.query){
        return responseCode(400);
    }

    const result = await openai.simpleImageGeneration(input.query, input.size && pixels[input.size]);

    return responseJson({
        value: result
    });
}