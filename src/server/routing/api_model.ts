import {Router} from "../../../deps.ts";
import {openai} from "../openai.ts";
import {type ServerState} from "../oak.ts";

const router = new Router<ServerState>();

router.get("/", async({response})=>{
    const {data} = await openai.listModels();

    response.body = {
        value: data
    };
});

export {router};