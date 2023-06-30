import {responseCode} from "./mids/response.ts";
import {route as route_index} from "./routes/index.ts";
import {route as route_chat} from "./routes/chat.ts";
import {route as route_image} from "./routes/image.ts";
import {route as route_model} from "./routes/model.ts";

export async function router(request:Request){
    switch(new URL(request.url).pathname){
        case "/": return await route_index(request);
        case "/chat": return await route_chat(request);
        case "/image": return await route_image(request);
        case "/model": return await route_model(request);
        default: return responseCode(404);
    }
}